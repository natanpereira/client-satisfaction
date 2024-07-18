import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IAnswerResponse } from '../../common/interfaces/answer.interface';
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

  @Column({ type: 'varchar', length: 100, default: 'public' })
  targetPublic: string;

  @Column({ type: 'date', default: new Date() })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @OneToMany(() => FormQuestion, (question) => question.form)
  questions: FormQuestion[];

  @OneToMany(() => Answer, (answer) => answer.form)
  answers: Answer[];

  answersResponse?: IAnswerResponse;
}
