import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text", { nullable: true })
  name!: string;

  @Column("text")
  nickname!: string;

  @Column("text", { unique: true })
  userId!: string;

  @Column("text", { unique: true })
  email!: string;

  @Column("boolean", { nullable: true })
  teacher!: boolean;
}
