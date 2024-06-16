import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateInvestment1718564501942 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'investments',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true
              },
              {
                name: 'btc',
                type: 'varchar',
                isNullable: false
              },
              {
                name: 'purchase_date',
                type: 'varchar',
                isNullable: false
              },
              {
                name: 'invested_amount',
                type: 'varchar',
                isNullable: false
              },
              {
                name: 'btc_price_at_purchase',
                type: 'varchar',
                isNullable: false
              },
              {
                name: 'account',
                type: 'varchar',
                isNullable: false
              }
            ]
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('investments');
        if (table) {
            await queryRunner.dropTable('investments');
        }
        
      }
    }
    