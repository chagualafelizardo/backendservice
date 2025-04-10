// routes/smsRoutes.js
import express from 'express';
import { sendSmsToClient } from '../controllers/smsController.js';

const router = express.Router();

// Rota POST para enviar SMS
router.post('/sendsms', sendSmsToClient);

export default router;
