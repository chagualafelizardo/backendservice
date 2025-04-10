// utils/mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // usa variáveis de ambiente
    pass: process.env.EMAIL_PASS
  }
});

export default transporter;
