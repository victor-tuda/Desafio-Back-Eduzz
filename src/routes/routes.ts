import Router from 'express';
import accountRouter from '../controllers/AccountController';

const routers = Router();

routers.use('/', accountRouter);
routers.use('/accounts', accountRouter);

export default routers; 


