import { accountRepository } from '../repositories/AccountRepository';
import Exception from '../helpers/exception';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginService {
  async login(email: string, password: string) {
    const account = await accountRepository.findOneBy({ email });

    if (!account) {
      throw new Exception(401, 'Invalid e-mail or password', 'login');
    }

    const verifyPass = await bcrypt.compare(password, account.password);

    if (!verifyPass) {
      throw new Exception(401, 'Invalid e-mail or password', 'login');
    }

    const token = jwt.sign({ id: account.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });

    const { password: _, ...accountData } = account;

    return {
      account: accountData,
      token: token
    };
  }
}

export default new LoginService();
