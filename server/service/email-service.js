import nodemailer from "nodemailer";

    class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, 
      },
    });
  }

 
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log("SMTP соединение успешно ");
    } catch (err) {
      console.error("Ошибка соединения SMTP ", err);
      throw err;
    }
  }

  async sendActivationEmail(to, link) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Support" <${process.env.SMTP_USER}>`,
        to,
        subject: "Активация аккаунта",
        text: `Для активации перейдите по ссылке: ${link}`,
        html: `<div><h1>Для активации перейдите по ссылке</h1><a href="${link}">${link}</a></div>`,
      });
      console.log("Письмо успешно отправлено:", info.messageId);
    } catch (err) {
      console.error("Ошибка при отправке письма:", err);
      throw new Error("Не удалось отправить письмо активации");
    }
  }
}

export const emailService = new EmailService();
