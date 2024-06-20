import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import CryptoController from '../controllers/CryptoController';
import LoginController from '../controllers/LoginController';
import IndexController from '../controllers/IndexController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routers = Router();

// Public routes
routers.get('/', IndexController.index);
routers.post('/account', AccountController.create); // Create a new account
routers.post('/login', LoginController.login); // Login to receive the token

// Protected routes
routers.use(authMiddleware); // All routes below this line will need the authentication token

// Account routes
routers.get('/account', AccountController.getAccount); // Get account information
routers.get('/account/balance', AccountController.getAccountBalance); // Get account balance information
routers.post('/account/deposit', AccountController.deposit); // Deposit into account

// Crypto routes
routers.get('/btc', CryptoController.getPosition); // Get crypto investment information
routers.get('/btc/price', CryptoController.getCryptoApi); // Get current BTC price
routers.post('/btc/purchase', CryptoController.buyCrypto); // Buy BTC

export default routers;