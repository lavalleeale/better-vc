import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Class extends BaseEntity {
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
  days: {
    Sunday: boolean;
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
  };

  @ManyToMany(() => User, (user) => user.classes, { eager: true })
  @JoinTable()
  students: User[];
}
