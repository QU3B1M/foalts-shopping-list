import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1648939862943 implements MigrationInterface {
    name = 'migration1648939862943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "category" varchar NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "item_on_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "list__item_on_list_item_on_list" ("listId" integer NOT NULL, "itemOnListId" integer NOT NULL, PRIMARY KEY ("listId", "itemOnListId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_466233c2b41cf0d9423fbfc5ea" ON "list__item_on_list_item_on_list" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a13a32d95b648c1ed4b6431511" ON "list__item_on_list_item_on_list" ("itemOnListId") `);
        await queryRunner.query(`DROP INDEX "IDX_466233c2b41cf0d9423fbfc5ea"`);
        await queryRunner.query(`DROP INDEX "IDX_a13a32d95b648c1ed4b6431511"`);
        await queryRunner.query(`CREATE TABLE "temporary_list__item_on_list_item_on_list" ("listId" integer NOT NULL, "itemOnListId" integer NOT NULL, CONSTRAINT "FK_466233c2b41cf0d9423fbfc5eae" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a13a32d95b648c1ed4b6431511e" FOREIGN KEY ("itemOnListId") REFERENCES "item_on_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("listId", "itemOnListId"))`);
        await queryRunner.query(`INSERT INTO "temporary_list__item_on_list_item_on_list"("listId", "itemOnListId") SELECT "listId", "itemOnListId" FROM "list__item_on_list_item_on_list"`);
        await queryRunner.query(`DROP TABLE "list__item_on_list_item_on_list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list__item_on_list_item_on_list" RENAME TO "list__item_on_list_item_on_list"`);
        await queryRunner.query(`CREATE INDEX "IDX_466233c2b41cf0d9423fbfc5ea" ON "list__item_on_list_item_on_list" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a13a32d95b648c1ed4b6431511" ON "list__item_on_list_item_on_list" ("itemOnListId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a13a32d95b648c1ed4b6431511"`);
        await queryRunner.query(`DROP INDEX "IDX_466233c2b41cf0d9423fbfc5ea"`);
        await queryRunner.query(`ALTER TABLE "list__item_on_list_item_on_list" RENAME TO "temporary_list__item_on_list_item_on_list"`);
        await queryRunner.query(`CREATE TABLE "list__item_on_list_item_on_list" ("listId" integer NOT NULL, "itemOnListId" integer NOT NULL, PRIMARY KEY ("listId", "itemOnListId"))`);
        await queryRunner.query(`INSERT INTO "list__item_on_list_item_on_list"("listId", "itemOnListId") SELECT "listId", "itemOnListId" FROM "temporary_list__item_on_list_item_on_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list__item_on_list_item_on_list"`);
        await queryRunner.query(`CREATE INDEX "IDX_a13a32d95b648c1ed4b6431511" ON "list__item_on_list_item_on_list" ("itemOnListId") `);
        await queryRunner.query(`CREATE INDEX "IDX_466233c2b41cf0d9423fbfc5ea" ON "list__item_on_list_item_on_list" ("listId") `);
        await queryRunner.query(`DROP INDEX "IDX_a13a32d95b648c1ed4b6431511"`);
        await queryRunner.query(`DROP INDEX "IDX_466233c2b41cf0d9423fbfc5ea"`);
        await queryRunner.query(`DROP TABLE "list__item_on_list_item_on_list"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "item_on_list"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
