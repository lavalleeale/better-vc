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

  @Column("text", { unique: true })
  userId!: string;

  @OneToMany(() => Class, (c) => c.creator)
  todos!: Promise<Class[]>;
}
