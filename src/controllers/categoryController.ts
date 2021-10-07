import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CategoryErrors } from '../errors/category';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CategoryView } from '../views/categoryView';

class CategoryController {
  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoryRepository = getCustomRepository(CategoryRepository);
      const category = await categoryRepository.findOne({ id });
      if (!category) {
        return res
          .status(400)
          .json(CategoryView.error(CategoryErrors.NOT_FOUND));
      }

      res.status(200).json(CategoryView.returnCategory(category));
    } catch (err) {
      res.status(401).json(CategoryView.error(err));
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const categoryRepository = getCustomRepository(CategoryRepository);

      const category = categoryRepository.create({
        name,
      });
      await categoryRepository.save(category);

      res.status(201).json(CategoryView.returnCategory(category));
    } catch (err) {
      res.status(401).json(CategoryView.error(err));
    }
  }
}

export { CategoryController };
