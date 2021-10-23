import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { CategoryErrors } from '../errors/category';
import { UserErrors } from '../errors/user';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CategoryView } from '../views/categoryView';

export class CategoryValidator {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(UserErrors.REQUIRED_NAME),
    });

    if (!(await schema.isValid(req.body))) {
      const validation = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => {
          const errors = err.errors.map((message: string) => {
            return message;
          });
          return errors;
        });
      return res.status(401).json(CategoryView.manyErrors(validation));
    }

    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.findOne({ name: req.body.name });
    if (category) {
      return res
        .status(401)
        .json(CategoryView.manyErrors(CategoryErrors.NAME_ALREADY_IN_USE));
    }

    next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(CategoryErrors.REQUIRED_NAME),
    });

    if (!(await schema.isValid(req.body))) {
      const validation = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => {
          const errors = err.errors.map((message: string) => {
            return message;
          });
          return errors;
        });
      return res.status(401).json(CategoryView.manyErrors(validation));
    }

    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.findOne({ id: req.params.id });
    if (!category) {
      return res
        .status(401)
        .json(CategoryView.manyErrors(CategoryErrors.NOT_FOUND));
    }

    next();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      id: Yup.number().required(CategoryErrors.REQUIRED_ID),
    });

    if (!(await schema.isValid(req.params))) {
      const validation = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => {
          const errors = err.errors.map((message: string) => {
            return message;
          });
          return errors;
        });
      return res.status(401).json(CategoryView.manyErrors(validation));
    }

    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.findOne({ id: req.params.id });
    if (!category) {
      return res
        .status(401)
        .json(CategoryView.manyErrors(CategoryErrors.NOT_FOUND));
    }

    next();
  }
}
