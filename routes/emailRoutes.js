// routes/emailRoutes.js
import express from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/sendemail', sendEmail);

export default router;
