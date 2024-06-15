import { accountRepository } from '../repositories/AccountRepository'
import { Request, Response, NextFunction } from 'express'
import Exception from '../helpers/api-errors'
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'

class LoginController {
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body

            // Search for an account with the same email
            const account = await accountRepository.findOneBy({ email });

            if(!account){
                throw new Exception(401, 'Invalid e-mail or password', req.path); // TODO: refactor this line
            }

            // Compare the password passed with the hashed password in the database
            const verifyPass = await bcrypt.compare(password, account.password)

            // Throw an error if the passwords didn't match
            if (!verifyPass) {
                throw new Exception(401, 'Invalid e-mail or password', req.path); // TODO: refactor this line
            }

            // Create a JWT
            const token = jwt.sign({ id: account.id}, process.env.JWT_PASS ?? '', {expiresIn: '8h'} )

            // Create a response to the client without the password field
            const {password: _, ...accountLogin} = account

            // Return this new response
            return res.json({
                account: accountLogin,
                token: token
            })

        } catch (err) {
            next(new Exception(500, "Internal Server Error", req.path)); // TODO: refactor this line
        }
    }
}

export default new LoginController