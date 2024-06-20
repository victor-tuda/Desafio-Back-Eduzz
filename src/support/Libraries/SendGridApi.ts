import Exception from '../../helpers/exception';
import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey as string);

interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export const sendEmail = async (msg: EmailMessage): Promise<any> => {
  try {
    console.log(apiKey)
    return await sgMail.send(msg);
  } catch (error) {
    throw new Exception(500, 'Internal Server Error', 'crypto');
  }
};
