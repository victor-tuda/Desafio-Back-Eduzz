import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';
import LoginValidator from '../validators/LoginValidator';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = await LoginValidator.login(req);
      const result = await LoginService.login(email, password);
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default new LoginController();