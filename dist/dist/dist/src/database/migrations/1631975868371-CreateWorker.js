"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorker1631975868371 = void 0;
const typeorm_1 = require("typeorm");
class CreateWorker1631975868371 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'worker',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: false,
                },
                {
                    name: 'cpf_cnpj',
                    type: 'varchar',
                },
                {
                    name: 'address',
                    type: 'varchar',
                },
            ],
        }));
        await queryRunner.createForeignKey('worker', new typeorm_1.TableForeignKey({
            columnNames: ['id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('worker');
    }
}
exports.CreateWorker1631975868371 = CreateWorker1631975868371;
//# sourceMappingURL=1631975868371-CreateWorker.js.map