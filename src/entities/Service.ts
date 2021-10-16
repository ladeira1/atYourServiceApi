import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity('service')
class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'min_value' })
  minValue: number;

  @Column({ name: 'max_value ' })
  maxValue: number;

  @Column({ name: 'thumbs_up' })
  thumbsUp: number;

  @Column({ name: 'times_provided' })
  timesProvided: number;

  @OneToOne(() => User, user => user)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Category, category => category)
  category: Category;

  @ManyToOne(() => Worker, worker => worker)
  worker: Worker;
}

export { Service };
