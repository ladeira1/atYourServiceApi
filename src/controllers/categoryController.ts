import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CategoryView } from '../views/categoryView';
import { WorkerView } from '../views/workerView';

class CategoryController {
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
      res.status(401).json(WorkerView.error(err));
    }
  }
}

export { CategoryController };
