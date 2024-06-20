import { Investment } from './../entities/Investment';
import { AppDataSource } from '../dataSource';

export const investmentRepository = AppDataSource.getRepository(Investment);
