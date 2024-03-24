import { Router } from "express";
import { sendEmail, sendEmailWithAttachments, sendEmailToResetPassword, resetPassword } from '../controllers/email.controller.js';

const emailRouter = Router();

emailRouter.get("/", sendEmail);
emailRouter.get("/attachments", sendEmailWithAttachments);


// Rutas para el reset
// --> /reset-password/:token


emailRouter.post("/send-email-to-reset", sendEmailToResetPassword);
emailRouter.get('/reset-password/:token', resetPassword)



export default emailRouter;