import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
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

  @Column({ name: 'cpf_cnpj ' })
  cpfCnpj: string;

  @Column()
  address: string;
}

export { Worker };
