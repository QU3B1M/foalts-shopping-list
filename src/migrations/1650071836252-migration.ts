import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1650071836252 implements MigrationInterface {
    name = 'migration1650071836252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL, "itemOnListId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "createdAt", "status", "itemOnListId") SELECT "id", "createdAt", "status", "itemOnListId" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "createdAt", "status") SELECT "id", "createdAt", "status" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL, "itemOnListId" integer)`);
        await queryRunner.query(`INSERT INTO "list"("id", "createdAt", "status") SELECT "id", "createdAt", "status" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL, "status" varchar NOT NULL, "itemOnListId" integer, CONSTRAINT "FK_819b79f710cdbd7240293f6e673" FOREIGN KEY ("itemOnListId") REFERENCES "item_on_list" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "list"("id", "createdAt", "status", "itemOnListId") SELECT "id", "createdAt", "status", "itemOnListId" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
    }

}
