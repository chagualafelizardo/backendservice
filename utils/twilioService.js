// utils/twilioService.js
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER; // Seu número Twilio

const client = twilio(accountSid, authToken);

export async function sendSMS(to, message) {
  try {
    const response = await client.messages.create({
      body: message,
      from: fromPhone,
      to: to
    });
    console.log('Mensagem enviada:', response.sid);
    return response;
  } catch (error) {
    console.error('Erro ao enviar SMS:', error.message);
    throw new Error('Falha ao enviar SMS');
  }
}
