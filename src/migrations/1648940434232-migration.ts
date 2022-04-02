import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1648940434232 implements MigrationInterface {
    name = 'migration1648940434232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_item_on_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "productId" integer, CONSTRAINT "UQ_1bfbfedb0acd84b5dbb5bd928c7" UNIQUE ("productId"))`);
        await queryRunner.query(`INSERT INTO "temporary_item_on_list"("id", "price", "quantity") SELECT "id", "price", "quantity" FROM "item_on_list"`);
        await queryRunner.query(`DROP TABLE "item_on_list"`);
        await queryRunner.query(`ALTER TABLE "temporary_item_on_list" RENAME TO "item_on_list"`);
        await queryRunner.query(`CREATE TABLE "temporary_item_on_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "productId" integer, CONSTRAINT "UQ_1bfbfedb0acd84b5dbb5bd928c7" UNIQUE ("productId"), CONSTRAINT "FK_7224c4e986eb2c48509bfa77e31" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_item_on_list"("id", "price", "quantity", "productId") SELECT "id", "price", "quantity", "productId" FROM "item_on_list"`);
        await queryRunner.query(`DROP TABLE "item_on_list"`);
        await queryRunner.query(`ALTER TABLE "temporary_item_on_list" RENAME TO "item_on_list"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_on_list" RENAME TO "temporary_item_on_list"`);
        await queryRunner.query(`CREATE TABLE "item_on_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "productId" integer, CONSTRAINT "UQ_1bfbfedb0acd84b5dbb5bd928c7" UNIQUE ("productId"))`);
        await queryRunner.query(`INSERT INTO "item_on_list"("id", "price", "quantity", "productId") SELECT "id", "price", "quantity", "productId" FROM "temporary_item_on_list"`);
        await queryRunner.query(`DROP TABLE "temporary_item_on_list"`);
        await queryRunner.query(`ALTER TABLE "item_on_list" RENAME TO "temporary_item_on_list"`);
        await queryRunner.query(`CREATE TABLE "item_on_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "item_on_list"("id", "price", "quantity") SELECT "id", "price", "quantity" FROM "temporary_item_on_list"`);
        await queryRunner.query(`DROP TABLE "temporary_item_on_list"`);
    }

}
