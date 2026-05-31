import 'dotenv/config';
import nodemailer from 'nodemailer';

const createTransporter = () => {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export const sendEmail = async (options) => {
  const transporter = createTransporter();
  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...options,
  });
};
