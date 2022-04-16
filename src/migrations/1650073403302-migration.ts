import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1650073403302 implements MigrationInterface {
    name = 'migration1650073403302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list_items_item_on_list" ("listId" integer NOT NULL, "itemOnListId" integer NOT NULL, PRIMARY KEY ("listId", "itemOnListId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e5147462d28698d4e9d8029d7" ON "list_items_item_on_list" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2327b04a8bebb6567d86586225" ON "list_items_item_on_list" ("itemOnListId") `);
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL, "name" varchar NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "createdAt", "status") SELECT "id", "createdAt", "status" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "status" varchar NOT NULL, "name" varchar NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "createdAt", "status", "name", "updated_at") SELECT "id", "createdAt", "status", "name", "updated_at" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
        await queryRunner.query(`DROP INDEX "IDX_0e5147462d28698d4e9d8029d7"`);
        await queryRunner.query(`DROP INDEX "IDX_2327b04a8bebb6567d86586225"`);
        await queryRunner.query(`CREATE TABLE "temporary_list_items_item_on_list" ("listId" integer NOT NULL, "itemOnListId" integer NOT NULL, CONSTRAINT "FK_0e5147462d28698d4e9d8029d72" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_2327b04a8bebb6567d865862257" FOREIGN KEY ("itemOnListId") REFERENCES "item_on_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("listId", "itemOnListId"))`);
        await queryRunner.query(`INSERT INTO "temporary_list_items_item_on_list"("listId", "itemOnListId") SELECT "listId", "itemOnListId" FROM "list_items_item_on_list"`);
        await queryRunner.query(`DROP TABLE "list_items_item_on_list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list_items_item_on_list" RENAME TO "list_items_item_on_list"`);
        await queryRunner.query(`CREATE INDEX "IDX_0e5147462d28698d4e9d8029d7" ON "list_items_item_on_list" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2327b04a8bebb6567d86586225" ON "list_items_item_on_list" ("itemOnListId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2327b04a8bebb6567d86586225"`);
        await queryRunner.query(`DROP INDEX "IDX_0e5147462d28698d4e9d8029d7"`);
        await queryRunner.query(`ALTER TABLE "list_items_item_on_list" RENAME TO "temporary_list_items_item_on_list"`);
        await queryRunner.query(`CREATE TABLE "list_items_item_on_list" ("listId" integer NOT NULL, "itemOnListId" integer NOT NULL, PRIMARY KEY ("listId", "itemOnListId"))`);
        await queryRunner.query(`INSERT INTO "list_items_item_on_list"("listId", "itemOnListId") SELECT "listId", "itemOnListId" FROM "temporary_list_items_item_on_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list_items_item_on_list"`);
        await queryRunner.query(`CREATE INDEX "IDX_2327b04a8bebb6567d86586225" ON "list_items_item_on_list" ("itemOnListId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e5147462d28698d4e9d8029d7" ON "list_items_item_on_list" ("listId") `);
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL, "name" varchar NOT NULL, "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "list"("id", "createdAt", "status", "name", "updated_at") SELECT "id", "createdAt", "status", "name", "updated_at" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "list"("id", "createdAt", "status") SELECT "id", "createdAt", "status" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
        await queryRunner.query(`DROP INDEX "IDX_2327b04a8bebb6567d86586225"`);
        await queryRunner.query(`DROP INDEX "IDX_0e5147462d28698d4e9d8029d7"`);
        await queryRunner.query(`DROP TABLE "list_items_item_on_list"`);
    }

}
