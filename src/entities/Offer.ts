import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './Service';
import { User } from './User';

@Entity('offer')
class Offer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  value: number;

  @Column()
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Service, service => service.offers, { eager: true })
  service: Service;

  @ManyToOne(() => User, user => user.offers, { eager: true })
  user: User;
}

export { Offer };
