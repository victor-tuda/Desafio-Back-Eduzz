import Router from 'express';
import AccountController from '../controllers/AccountController';

const routers = Router();

routers.get('/');
routers.post('/accounts', AccountController.create);

export default routers; 


