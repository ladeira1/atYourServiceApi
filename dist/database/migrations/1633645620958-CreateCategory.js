"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategory1633645620958 = void 0;
const typeorm_1 = require("typeorm");
class CreateCategory1633645620958 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: false,
                },
                {
                    name: 'name',
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
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('category');
    }
}
exports.CreateCategory1633645620958 = CreateCategory1633645620958;
