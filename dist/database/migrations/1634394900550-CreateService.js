"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateService1634394900550 = void 0;
const typeorm_1 = require("typeorm");
class CreateService1634394900550 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
        await queryRunner.createForeignKey('service', new typeorm_1.TableForeignKey({
            columnNames: ['category'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('service', new typeorm_1.TableForeignKey({
            columnNames: ['worker'],
            referencedColumnNames: ['id'],
            referencedTableName: 'worker',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('service');
    }
}
exports.CreateService1634394900550 = CreateService1634394900550;
