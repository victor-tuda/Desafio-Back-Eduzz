import { Request, Response, NextFunction } from 'express';
import CryptoApi from '../support/Libraries/CryptoApi';
import Exception from '../helpers/api-errors';


class CryptoController {
    
    async getCryptoApi(req: Request, res: Response, next: NextFunction) {
        try {

            const crypto = await CryptoApi.getCryptoApi
            console.log(crypto);
            return res.json(crypto);

        } catch (error) {
        next(new Exception(500, 'Internal Server Error', req.path)); // TODO: refactor this line
        }
    }
}


export default new CryptoController();