import { authMiddleware } from './../middlewares/authMiddleware';
import Router from 'express';
import AccountController from '../controllers/AccountController';
import CryptoController from '../controllers/CryptoController';
import LoginController from '../controllers/LoginController';

const routers = Router();

routers.post('/account', AccountController.create); // Create a new account
routers.post('/login', LoginController.login); // Login to receive the token

routers.use(authMiddleware); // Below of this line, all the routes will need the authentication token

routers.get('/account', AccountController.getAccount); // Get informations about the account
routers.get('/account/balance', AccountController.getAccountBallance); // Get informations about the account balance
routers.post('/account/deposit', AccountController.deposit);

routers.get('/btc', CryptoController.getPosition); // Get informations about crypto
routers.get('/btc/price', CryptoController.getCryptoApi); // Get informations about crypto
routers.post('/btc/purchase', CryptoController.buyCrypto) // Creat Controler method

export default routers;