import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column("text", { nullable: true })
  name!: string;

  @Column("text")
  nickname!: string;

  @PrimaryColumn("text", { unique: true })
  email!: string;

  @Column("boolean", { nullable: true })
  teacher!: boolean;
}
