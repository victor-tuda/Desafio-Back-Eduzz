import { sendEmail } from './../support/Libraries/SendGridApi';
import Exception from './../helpers/exception';

class EmailService {
  async sendEmail(email: string, subject: string, html: string) {
    try {
      const emailTemplate = {
        to: email,
        from: 'victortudadev@gmail.com',
        subject: subject,
        html: `<strong>${html}</strong>`
      };

      return await sendEmail(emailTemplate);
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', 'Error at send email');
    }
  }
}

export default new EmailService();