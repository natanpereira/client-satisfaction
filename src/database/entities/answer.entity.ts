import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormQuestion } from './form-question.entity';
import { Form } from './form.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  answerId: string;

  @Column({ type: 'text' })
  answer: string | number | boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Form)
  @JoinColumn({ name: 'formId' })
  form: Form;

  @ManyToOne(() => FormQuestion)
  @JoinColumn({ name: 'formQuestionId' })
  formQuestion: FormQuestion;
}
