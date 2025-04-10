// controllers/smsController.js
import { sendSMS } from '../utils/twilioService.js';

export const sendSmsToClient = async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  try {
    const sentMessage = await sendSMS(phoneNumber, message);
    res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      messageSid: sentMessage.sid
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to send SMS: ${error.message}` });
  }
};