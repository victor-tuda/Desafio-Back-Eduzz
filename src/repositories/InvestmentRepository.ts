import { Investment } from './../entities/Investment';
import { AppDataSource } from '../data-source';

export const investmentRepository = AppDataSource.getRepository(Investment);
