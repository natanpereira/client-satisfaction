import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAnswerResponse } from '../../common/enums/interfaces/answer.interface';
import { AbstractTimestamp } from './abstract-timestamp.entity';
import { Answer } from './answer.entity';
import { FormQuestion } from './form-question.entity';

@Entity()
export class Form extends AbstractTimestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => FormQuestion, (question) => question.form)
  questions: FormQuestion[];

  @OneToMany(() => Answer, (answer) => answer.form)
  answers: Answer[];

  answersResponse?: IAnswerResponse;
}
