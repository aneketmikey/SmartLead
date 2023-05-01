import { User } from "../models/User.js";
import { Email } from "../models/Email.js";
import { emailService } from "../services/emailService.js";
import { decrypt } from "../util/encryption.js";
import { errorHandler } from "../middlewares/errorMiddleware.js";
import { EmailSchema } from "../validation/schemaValidation.js"
    //save Email data to DB and send mail
export const sendMail = async (req, res) => {
    try {
    
        const userId = req.params.userId
        if (userId && !isNaN(userId)) {
            //validate userId

            //validate input email request
            const validEmailData = await EmailSchema.validate(req.body, {
                strict: true,
            });

            let { email_to, cc, bcc, subject, body } = validEmailData;

            
            //add CC if not passsed in request
              if (!cc) {
                cc=[]
            }
              if (!bcc) {
               bcc = [];
              }
        //     if (bcc && bcc.length == 0){
        //         bcc.push(process.env.BCC_EMAIL);
        // }
    
            

          //fetch user data from DB
          let fetchedUserData = await User.findAll({
            where: { User_id: userId },
          });

          let {
            SMTP_Host: host,
            SMTP_Port: port,
            User_name: username,
            Password: encryptedPassword,
            Email: senderEmail,
            Name: name,
          } = fetchedUserData[0].dataValues;

          //decrypt password fetched from DB in order to pass in nodemailer credential
          let decryptedPassword = decrypt(encryptedPassword);

          let message = {
            name: name,
            from: senderEmail,
            to: [...email_to],
            cc: [...cc],
            bcc: [...bcc], //destructure arrays to be passed as strings to nodemailer for multiple recepients
            subject: subject,
            body: body,
          };
          //call email servicet
            
            try {
                let sentMail = await emailService(
                    host,
                    port,
                    username,
                    decryptedPassword,
                    message
                );
                console.log(sentMail);
                let status = 'success'
                const user = await Email.create({
                    Email_to: email_to,
                    CC: cc,
                    BCC: bcc,
                    Subject: subject,
                    Body: body,
                    User_id: userId,
                    Status: status,
                });
                return res.status(200).json({
                    status: 250,
                    message: "Email sent successfully",
                    recipients: sentMail.accepted,
                    messageId: sentMail.messageId,
                });
            }
            catch (error) {

                console.log(error.message)
                let status = error.message
                const user = await Email.create({
                    Email_to: email_to,
                    CC: cc,
                    BCC: bcc,
                    Subject: subject,
                    Body: body,
                    User_id: userId,
                    Status: status,
                });
                return res.status(400).json({
                    status: 400,
                    message: "Email not sent successfully",
                    error: error.message
                });
                
            }     }
        else {
             
                   return res.json({
                     status: 400,
                       message: "Invalid User Id",
                     
                   });
        }
    }
    //catch error if any
    catch (error) {
             errorHandler(error, req, res);
            const err = new Error(
                error.message ? error.message : JSON.stringify(error)
            );
            console.log(err);
        }
    ;
}
