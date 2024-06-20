import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('accounts')
export class Account {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  balance: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
