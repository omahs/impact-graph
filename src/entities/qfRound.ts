import { Field, ID, ObjectType } from 'type-graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToMany,
  ManyToOne,
  RelationId,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Project } from './project';
import { MainCategory } from './mainCategory';

@Entity()
@ObjectType()
export class QfRound extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isActive: boolean;

  @Field(type => Number)
  @Column()
  allocatedFund: number;

  @Field(type => Number)
  @Column()
  minimumPassportScore: number;

  @Field(type => Date)
  @Column()
  beginDate: Date;

  @Field(type => Date)
  @Column()
  endDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(type => Project, project => project.qfRounds)
  projects: Project[];
}