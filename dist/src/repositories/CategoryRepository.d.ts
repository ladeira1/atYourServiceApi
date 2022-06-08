import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
declare class CategoryRepository extends Repository<Category> {
}
export { CategoryRepository };
