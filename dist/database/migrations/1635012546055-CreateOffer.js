"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOffer1635012546055 = void 0;
const typeorm_1 = require("typeorm");
class CreateOffer1635012546055 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'offer',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'message',
                    type: 'varchar',
                },
                {
                    name: 'value',
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
                    name: 'status',
                    type: 'varchar',
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
                    name: 'user',
                    type: 'uuid',
                },
                {
                    name: 'service',
                    type: 'uuid',
                },
            ],
        }));
        await queryRunner.createForeignKey('offer', new typeorm_1.TableForeignKey({
            columnNames: ['service'],
            referencedColumnNames: ['id'],
            referencedTableName: 'service',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('offer', new typeorm_1.TableForeignKey({
            columnNames: ['user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('offer');
    }
}
exports.CreateOffer1635012546055 = CreateOffer1635012546055;
