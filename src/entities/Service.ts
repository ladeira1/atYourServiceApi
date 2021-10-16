import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';
import { Worker } from './Worker';

@Entity('service')
class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'min_value' })
  minValue: number;

  @Column({ name: 'thumbs_up' })
  thumbsUp: number;

  @Column({ name: 'times_provided' })
  timesProvided: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Category, category => category)
  category: Category;

  @OneToMany(() => Worker, worker => worker)
  worker: Worker;
}

export { Service };
