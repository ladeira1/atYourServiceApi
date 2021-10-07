import { Category } from '../entities/Category';
import { DefaultView } from './defaultView';

export class CategoryView extends DefaultView {
  static returnCategory(category: Category) {
    return {
      category,
    };
  }
}
