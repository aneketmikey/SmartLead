import { Router } from "express";
import { saveUserData, getUserData } from "../controllers/userDetails.js";
import { sendMail } from "../controllers/sendMail.js";
const router = Router();

router.post('/user-details', saveUserData); //route to save user data in DB
router.get('/user-details/:userId',getUserData) //route to get a particular user data from DB  
router.post('/send-mail/:userId', sendMail); //route to send mail by a particular user
export default router;;