import { Account } from '../../entities/Account';

declare global {
    namespace Express {
        export interface Request {
            account: Partial<Account>
        }
    }
}