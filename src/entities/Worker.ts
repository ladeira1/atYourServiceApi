import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Service } from './Service';
import { User } from './User';

@Entity('worker')
class Worker {
  @PrimaryColumn()
  @OneToOne(() => User, user => user.id)
  @JoinColumn({
    referencedColumnName: 'id',
  })
  id: string;

  @OneToOne(() => User, user => user)
  user: User;

  @Column({ name: 'cpf_cnpj' })
  cpfCnpj: string;

  @Column()
  address: string;

  @OneToMany(() => Service, service => service.worker)
  services: Service[];
}

export { Worker };
