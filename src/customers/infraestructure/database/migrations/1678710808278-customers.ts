import { MigrationInterface, QueryRunner } from "typeorm";

export class customers1678710808278 implements MigrationInterface {
    name = 'customers1678710808278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_entity" ("uuid" uuid NOT NULL, "name" character varying NOT NULL DEFAULT 'UNKNOWN', "lastName" character varying NOT NULL DEFAULT 'UNKNOWN', "accountNumber" integer NOT NULL DEFAULT '123456', "availableCredit" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a4041ca7652d6b8109c5efb8e89" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer_entity"`);
    }

}
