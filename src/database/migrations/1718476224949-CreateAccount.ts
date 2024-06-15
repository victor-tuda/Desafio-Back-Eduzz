import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateAccount1718476224949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('accounts', [
      new TableColumn({
        name: 'balance',
        type: 'varchar'
      }),
      new TableColumn({
        name: 'name',
        type: 'varchar'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('accounts', ['balance', 'name']);
  }
}
