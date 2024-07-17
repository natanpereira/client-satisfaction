import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractTimestamp } from './abstract-timestamp.entity';
import { Answer } from './answer.entity';
import { Form } from './form.entity';

@Entity()
export class FormQuestion extends AbstractTimestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Column({ type: 'integer', nullable: true })
  length: number;

  @Column({ type: 'boolean' })
  required: boolean;

  @ManyToOne(() => Form, (form) => form.questions)
  @JoinColumn({ name: 'formId' })
  form: Form;

  @OneToMany(() => Answer, (answer) => answer.formQuestion)
  answers: Answer[];
}
