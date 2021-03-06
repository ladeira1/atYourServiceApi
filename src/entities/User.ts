import bcrypt from 'bcryptjs';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Offer } from './Offer';
import { Worker } from './Worker';

@Entity('user')
class User {
  @PrimaryColumn({ type: 'uuid' }) id: string;

  @Column() name: string;

  @Column({ unique: true }) email: string;

  @Column() password: string;

  @Column() phone: string;

  @Column() city: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  @OneToOne(() => Worker, worker => worker.user) worker: Worker;

  @OneToMany(() => Offer, offer => offer.user) offers: Offer[];

  constructor() {
    if (!this.id) this.id = uuid();
  }

  hashPassword(password: string) {
    this.password = bcrypt.hashSync(password, 8);
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

export { User };
