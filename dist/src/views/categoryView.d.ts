import { Category } from '../entities/Category';
import { DefaultView } from './defaultView';
export declare class CategoryView extends DefaultView {
    static returnCategory(category: Category): {
        category: Category;
    };
    static returnMany(categories: Category[]): {
        category: Category;
    }[];
}
