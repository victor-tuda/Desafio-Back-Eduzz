import { accountRepository } from '../repositories/AccountRepository';
import { investmentRepository } from '../repositories/InvestmentRepository';
import EmailService from '../services/EmailService';
import { CotationResponse, TickerResponse, BuyCrypto } from '../interfaces/crypto';
import { Account as AccountEntity } from '../entities/Account';
import CryptoApi from '../support/Libraries/CryptoApi';
import Exception from '../helpers/exception';

class CryptoService {
  public async getCryptoApi(): Promise<CotationResponse> {
    try {
      const crypto = await CryptoApi.getCryptoApi();
      const cryptoCotation = this.cotationData(crypto);
      return cryptoCotation;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', '/btc/price');
    }
  }

  public async buyCrypto(amount: string, id: any) {
    try {
      const accountFromDB = await accountRepository.findOneBy({ id });
      const { name, email, balance }: any = accountFromDB;

      // Capture the current state of bitcoin
      const btc_return = await this.getCryptoApi();

      // Validate if the amount passed is lower than the balance in the account
      if (parseFloat(amount) <= parseFloat(balance) && parseFloat(amount) > 0) {
        const newAmount = String(parseFloat(balance) - parseFloat(amount));

        // Save the new amount in the database
        await accountRepository.createQueryBuilder().update(AccountEntity).set({ balance: newAmount }).where('id = :id', { id }).execute();

        // Calculate the value of btc received, based on the amount passed
        const calculateInvestment = String(parseFloat(amount) / parseFloat(btc_return.btc.cotation));

        const newInvestment = investmentRepository.create({
          account: id,
          btc: calculateInvestment,
          purchase_date: String(new Date()),
          invested_amount: amount,
          btc_price_at_purchase: btc_return.btc.cotation
        });

        await investmentRepository.save(newInvestment);

        await EmailService.sendEmail(
          email,
          'A purchase has been made!',
          `A new amount of ${calculateInvestment} BTCs has been added to your account!`
        );

        const cryptoReturn = this.buyCryptoTemplate(id, name, amount, calculateInvestment);
        return cryptoReturn;
      } else {
        return {
          operation_failed: 'Invalid value for amount'
        };
      }
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', '/btc/purchase');
    }
  }

  public async getPosition(id: any) {
    try {
      // Get the account using the id
      // const accountFromDB = await accountRepository.findOneBy({ id });
      // const { name }: any = accountFromDB;

      // Get the investments of that account using the id
      const investmentsFromDB = await investmentRepository.findBy({ account: id });

      // Capture the current state of bitcoin
      //const btc_return = await this.getCryptoApi();

      return investmentsFromDB;
    } catch (error) {
      throw new Exception(500, 'Internal Server Error', '/btc');
    }
  }

  private buyCryptoTemplate(id: any, name: any, value_invested: string, btc_received: string): BuyCrypto {
    return {
      investment: {
        account_id: id,
        name: name,
        value_invested: value_invested,
        btc_received: btc_received
      }
    };
  }

  private cotationData(crypto: TickerResponse): CotationResponse {
    return {
      btc: {
        cotation: crypto.ticker.last,
        buy: crypto.ticker.buy,
        sell: crypto.ticker.sell
      }
    };
  }
}

export default new CryptoService();
