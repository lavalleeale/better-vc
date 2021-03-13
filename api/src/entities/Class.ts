/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true })
  name: string;

  @Column("smallint")
  startTime: number;

  @Column("smallint")
  endTime: number;

  @Column("text", { nullable: true })
  zoomLink!: string;

  @ManyToOne(() => User, (user) => user, { eager: true })
  teacher: User;

  @Column("simple-json")
  days: Array<boolean>;

  @ManyToMany(() => User, (user) => user.classes, { eager: true })
  @JoinTable()
  students: User[];
}
