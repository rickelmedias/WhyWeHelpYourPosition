import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class researches1642369429722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'researches',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "keyword",
                        type: "varchar"
                    },
                    {
                        name: "website",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('researches');
    }

}
