/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  BaseEntity, Column, Entity, ManyToMany, PrimaryColumn,
} from 'typeorm';
import Class from './Class';

@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text')
  nickname: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('text', { nullable: true })
  imageId: string;

  @Column('boolean', { nullable: true })
  teacher: boolean;

  @ManyToMany(() => Class, (block) => block.students)
  classes: Class[];
}
