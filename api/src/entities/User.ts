import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Class } from "./Class";

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

  @OneToMany(() => Class, (c) => c.creator)
  todos!: Promise<Class[]>;
}
