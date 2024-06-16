import { Request } from 'express';
import * as Yup from 'yup';
import Exception from '../helpers/exception';

class LoginValidator {
  public async login(req: Request) {
    try {
      const schema = Yup.object({
        email: Yup.string().email().required().max(50),
        password: Yup.string().required().max(50)
      });

      const payload = {
        email: req.body.email,
        password: req.body.password
      };

      await schema.validate(payload, { abortEarly: false });

      return payload;
    } catch (error) {
      throw new Exception(400, 'Validation failed', req.path);
    }
  }
}

export default new LoginValidator();