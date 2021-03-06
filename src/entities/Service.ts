import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';
import { Image } from './Image';
import { Offer } from './Offer';
import { Worker } from './Worker';

@Entity('service')
class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'min_value' })
  minValue: number;

  @Column({
    name: 'thumbs_up',
    nullable: true,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  thumbsUp: number;

  @Column({ name: 'times_provided' })
  timesProvided: number;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.services, { eager: true })
  category: Category;

  @ManyToOne(() => Worker, worker => worker.services, { eager: true })
  worker: Worker;

  @OneToMany(() => Image, image => image.service, {
    eager: true,
  })
  images: Image[];

  @OneToMany(() => Offer, offer => offer.service)
  offers: Offer[];
}

export { Service };
