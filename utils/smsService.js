// utils/smsService.js
import twilio from 'twilio';

// Crie uma instância do Twilio com suas credenciais
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, message) => {
  try {
    const messageSent = await client.messages.create({
      body: message,              // Corpo da mensagem
      from: process.env.TWILIO_PHONE,  // Seu número Twilio
      to: to                      // Número de telefone do cliente
    });

    return messageSent;
  } catch (error) {
    throw new Error('Failed to send SMS: ' + error.message);
  }
};
