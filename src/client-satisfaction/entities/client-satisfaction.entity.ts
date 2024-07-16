import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answers } from './answers.entity';

@Entity('client_satisfaction')
export class ClientSatisfaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  targetPublic: string;

  @Column({ type: 'tinyint' })
  stars: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Answers, (answer) => answer.clientSatisfaction)
  answers: Answers[];
}
