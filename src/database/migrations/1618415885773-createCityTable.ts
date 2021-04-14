import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createCityTable1618415885773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'prefect',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'population',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'state_fk',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }));

      await queryRunner.createForeignKey('cities', new TableForeignKey({
        name: 'stateFk',
        columnNames: ['state_fk'],
        referencedTableName: 'states',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('cities','stateFk');

      await queryRunner.dropTable('cities');
    }

}
