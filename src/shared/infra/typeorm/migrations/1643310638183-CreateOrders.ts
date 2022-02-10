import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateOrders1643227814889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "pedidos",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "cliente_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "data",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "forma_pagamento",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "valor",
            type: "float",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "desconto",
            type: "float",
            precision: 4,
            scale: 2,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "pedidos",
      new TableForeignKey({
        columnNames: ["cliente_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clientes",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("pedidos");
  }
}
