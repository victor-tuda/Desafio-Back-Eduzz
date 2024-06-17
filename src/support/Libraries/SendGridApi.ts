import Exception from '../../helpers/exception';
import sgMail from '@sendgrid/mail';

// Defina a chave de API. Certifique-se de usar variáveis de ambiente para segurança.
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// Definição da interface para a mensagem de e-mail
interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  html: string;
}

// Função para enviar e-mail
export const sendEmail = async (msg: EmailMessage): Promise<any> => {
  try {
    return await sgMail.send(msg);
  } catch (error) {
    throw new Exception(500, 'Internal Server Error', 'crypto');
  }
};
