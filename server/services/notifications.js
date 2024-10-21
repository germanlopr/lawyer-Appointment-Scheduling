import TelegramBot from 'node-telegram-bot-api';
import twilio from 'twilio';

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendNotification = async (user, title, message) => {
  try {
    // Send Telegram notification
    await telegramBot.sendMessage(user.telegramChatId, `${title}\n\n${message}`);

    // Send WhatsApp notification
    await twilioClient.messages.create({
      body: `${title}\n\n${message}`,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${user.phoneNumber}`
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};