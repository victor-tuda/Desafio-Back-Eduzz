import { sendEmail } from './../support/Libraries/SendGridApi';

class EmailService {
  async sendEmail(email: string, subject: string, html: string) {
    const emailTemplate = {
      to: email,
      from: 'victortudadev@gmail.com',
      subject: subject,
      html: `<strong>${html}</strong>`
    };

    return await sendEmail(emailTemplate);
  }
}

export default new EmailService();
