import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Class } from "./Class";

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

  @ManyToMany(() => Class, (block) => block.students)
  classes: Class[];
}
