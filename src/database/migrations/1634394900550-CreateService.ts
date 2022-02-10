import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateService1634394900550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'min_value',
            type: 'numeric',
          },
          {
            name: 'thumbs_up',
            type: 'numeric',
            isNullable: true,
            precision: 10,
            scale: 2,
          },
          {
            name: 'times_provided',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'category',
            type: 'integer',
          },
          {
            name: 'worker',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'service',
      new TableForeignKey({
        columnNames: ['category'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'service',
      new TableForeignKey({
        columnNames: ['worker'],
        referencedColumnNames: ['id'],
        referencedTableName: 'worker',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service');
  }
}
