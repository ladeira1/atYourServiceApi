import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('category')
class Category {
  @PrimaryColumn()
  @OneToOne(() => User, user => user.id)
  @JoinColumn({
    referencedColumnName: 'id',
  })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export { Category };
