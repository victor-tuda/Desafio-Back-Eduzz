import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid"
import { Account } from "./Account"

@Entity("investments")
export class Investment {

    @PrimaryColumn()
    id: string

    @Column()
    purchase_date: string

    @Column()
    invested_amount: string

    @Column()
    bitcoin_price_at_purchase: string

    @Column()
    bitcoin_price_change_percentage: string

    @Column()
    current_gross_investment_value:string

    @ManyToOne(() => Account, (account) => account.id)
    account_id: string

    // Constructor que gera um id caso o campo venha vazio
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}
