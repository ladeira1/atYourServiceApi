"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImage1634855884972 = void 0;
const typeorm_1 = require("typeorm");
class CreateImage1634855884972 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'image',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: false,
                },
                {
                    name: 'url',
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
                    name: 'service',
                    type: 'uuid',
                },
            ],
        }));
        await queryRunner.createForeignKey('image', new typeorm_1.TableForeignKey({
            columnNames: ['service'],
            referencedColumnNames: ['id'],
            referencedTableName: 'service',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('image');
    }
}
exports.CreateImage1634855884972 = CreateImage1634855884972;
//# sourceMappingURL=1634855884972-CreateImage.js.map