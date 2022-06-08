import { Repository } from 'typeorm';
import { User } from '../entities/User';
declare class UserRepository extends Repository<User> {
}
export { UserRepository };
