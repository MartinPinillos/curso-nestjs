import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeVarchar1777823039070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE character varying(255)`);
    }

}
