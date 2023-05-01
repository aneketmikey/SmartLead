import { User } from "../models/User.js";
import { UserSchema } from "../validation/schemaValidation.js";
import { errorHandler } from "../middlewares/errorMiddleware.js";
import { encrypt} from "../util/encryption.js";

//save user Data to database
export const saveUserData = async (req, res) => {
  try {

    //validate all the input fields 
    const validUserDetails = await UserSchema.validate(req.body, {strict: true});
    const {
      name,
      email,
      user_name,
      password,
      smtp_host,
      smtp_port,
      smtp_encryption,
      message_per_day,
      minimum_time_gap,
      imap_host,
      imap_port,
      imap_encryption,
    } = validUserDetails;

      let encryptedPassword = encrypt(password) //encrypt password before saving in DB

      //save the user Details in DB
      const user = await User.create({
        Name: name.toLowerCase(),
        Email: email.toLowerCase(),
        User_name: user_name.toLowerCase(),
        Password: encryptedPassword,
        SMTP_Host: smtp_host.toLowerCase(),
        SMTP_Port: smtp_port,
        SMTP_Encryption: smtp_encryption,
        Message_Per_Day: message_per_day,
        Minimum_Time_Gap: minimum_time_gap,
        IMAP_Host: imap_host.toLowerCase(),
        IMAP_Port: imap_port,
        IMAP_Encryption: imap_encryption,
      });
      const userId = user.dataValues.User_id;
    
      return res.json({
        status: 201,
        message: "User details saved successfully",
        userId:userId
      });
  }
  //catch error if any
    catch (error) {
       errorHandler(error, req, res);
        const err = new Error(
            error.message ? error.message : JSON.stringify(error)
        );
        console.log(err);
    }
}
//fetch User data from DB
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId && !isNaN(userId)) { //validate userId
      const user = await User.findAll({
        where: { User_id: userId },
      });
      
      return res.json({
        status: 200,
        message: "User details fetched successfully",
        data: user[0],
      });
    } else {
      return res.json({
        status: 400,
        message: "Invalid User Id",
      });
    }
    //catch error if any
  } catch (error) {
    errorHandler(error, req, res);
    const err = new Error(
      error.message ? error.message : JSON.stringify(error)
    );
    console.log(err);
  }
};


export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId && !isNaN(userId)) {
      //validate userId
      const user = await User.findAll({
        where: { User_id: userId },
      });

      let updateUser = user[0].dataValues;
      console.log(updateUser);
      const {
        name,
        email,
        user_name,
        password,
        smtp_host,
        smtp_port,
        smtp_encryption,
        message_per_day,
        minimum_time_gap,
        imap_host,
        imap_port,
        imap_encryption,
      } = req.body;

      let encryptedPassword = encrypt(password); //encrypt password before saving in DB


      const updatedUser = await User.update(
        {
          Name: name.toLowerCase(),
          Email: email.toLowerCase(),
          User_name: user_name.toLowerCase(),
          Password: encryptedPassword,
          SMTP_Host: smtp_host.toLowerCase(),
          SMTP_Port: smtp_port,
          SMTP_Encryption: smtp_encryption,
          Message_Per_Day: message_per_day,
          Minimum_Time_Gap: minimum_time_gap,
          IMAP_Host: imap_host.toLowerCase(),
          IMAP_Port: imap_port,
          IMAP_Encryption: imap_encryption,
        },
        { where: { User_id: userId } }
      );
      console.log(updatedUser);

      return res.json({
        status: 200,
        message: "User details updated successfully",
        data: updatedUser,
      });
    } else {
      return res.json({
        status: 400,
        message: "Invalid User Id",
      });
    }
    //catch error if any
  } catch (error) {
    errorHandler(error, req, res);
    const err = new Error(
      error.message ? error.message : JSON.stringify(error)
    );
    console.log(err);
  }
};
