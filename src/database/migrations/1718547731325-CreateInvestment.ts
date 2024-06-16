import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateInvestment1718547731325 implements MigrationInterface {
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
            name: 'bitcoin_price_at_purchase',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'bitcoin_price_change_percentage',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'current_gross_investment_value',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'account_id',
            type: 'varchar',
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'investments',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('investments');
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('account_id') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('investments', foreignKey);
        await queryRunner.dropTable('investments');
      }
    }
  }
}
