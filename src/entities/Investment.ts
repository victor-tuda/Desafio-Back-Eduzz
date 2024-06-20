import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('investments')
export class Investment {
  @PrimaryColumn()
  id: string;

  @Column()
  btc: string;

  @Column()
  purchase_date: string;

  @Column()
  invested_amount: string;

  @Column()
  btc_price_at_purchase: string;

  @Column()
  account: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
