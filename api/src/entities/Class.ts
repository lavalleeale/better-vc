import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @Column("text")
  startTime: string;

  @Column("text")
  endTime: string;

  @Column("text", { nullable: true })
  zoomLink!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  teacher: User;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  students: User[];
}
