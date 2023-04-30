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
            if (cc.length == 0) cc.push(process.env.CC_EMAIL);

          //add BCC if not passsed in request
          if (bcc.length == 0) bcc.push(process.env.BCC_EMAIL);

          //save email data to DB
          const user = await Email.create({
            Email_to: email_to,
            CC: cc,
            BCC: bcc,
            Subject: subject,
            Body: body,
            User_id: userId,
          });
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
            to: [...email_to, ...cc, ...bcc],  //destructure arrays to be passed as strings to nodemailer for multiple recepients
            subject: subject,
            body: body,
          };
          //call email service
          let sentMail = await emailService(
            host,
            port,
            username,
            decryptedPassword,
            message
          );
          console.log(sentMail);
          return res.status(200).json({
            status: 250,
            message: "Email sent successfully",
            recipients: sentMail.accepted,
            messageId: sentMail.messageId,
          });
        }
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
