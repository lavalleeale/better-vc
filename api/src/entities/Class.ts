import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  text!: string;

  @Column("boolean", { default: false })
  completed!: boolean;

  @Column()
  creatorId!: number;

  @JoinColumn({ name: "creatorId" })
  @ManyToOne(() => User, (u) => u.todos)
  creator!: Promise<User>;
}
