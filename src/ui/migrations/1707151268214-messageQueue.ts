import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageQueue1707151268214 implements MigrationInterface {
    name = 'MessageQueue1707151268214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "queue-messages" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "module" character varying(256) NOT NULL, CONSTRAINT "UQ_54c4b635bc262b322d8780a870b" UNIQUE ("name"), CONSTRAINT "PK_45f5ffc6f543cf7f9dd7bb95969" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "queue-messages"`);
    }

}
