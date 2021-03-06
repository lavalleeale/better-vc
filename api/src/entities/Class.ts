import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true })
  name: string;

  @Column("text")
  startTime: string;

  @Column("text")
  endTime: string;

  @Column("text", { nullable: true })
  zoomLink!: string;

  @Column("text")
  teacher: string;

  @ManyToMany(() => User, (user) => user.classes, { eager: true })
  @JoinTable()
  students: User[];
}
