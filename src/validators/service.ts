import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { CategoryErrors } from '../errors/category';
import { ServiceErrors } from '../errors/service';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { ServiceView } from '../views/serviceView';

export class ServiceValidator {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(ServiceErrors.REQUIRED_NAME),
      minValue: Yup.number().required(ServiceErrors.REQUIRED_MIN_VALUE),
      categoryId: Yup.number().required(ServiceErrors.REQUIRED_CATEGORY_ID),
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
      return res.status(401).json(ServiceView.manyErrors(validation));
    }

    const workerRepository = getCustomRepository(WorkerRepository);
    const worker = await workerRepository.findOne({ id: req.userId });
    if (!worker) {
      return res
        .status(401)
        .json(ServiceView.manyErrors(ServiceErrors.NOT_A_WORKER));
    }

    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = await categoryRepository.findOne({
      id: req.body.categoryId,
    });
    if (!category) {
      return res
        .status(401)
        .json(ServiceView.manyErrors(CategoryErrors.NOT_FOUND));
    }

    const serviceRepository = getCustomRepository(ServiceRepository);
    const service = await serviceRepository.findOne({
      name: req.body.name,
      worker,
    });

    if (service) {
      return res
        .status(401)
        .json(ServiceView.manyErrors(ServiceErrors.ALREADY_EXISTS));
    }

    next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      minValue: Yup.number(),
      categoryId: Yup.number(),
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
      return res.status(401).json(ServiceView.manyErrors(validation));
    }

    const workerRepository = getCustomRepository(WorkerRepository);
    const worker = await workerRepository.findOne({ id: req.userId });
    if (!worker) {
      return res
        .status(401)
        .json(ServiceView.manyErrors(ServiceErrors.NOT_A_WORKER));
    }

    if (req.body.categoryId) {
      const categoryRepository = getCustomRepository(CategoryRepository);
      const category = await categoryRepository.findOne({
        id: req.body.categoryId,
      });
      if (!category) {
        return res
          .status(401)
          .json(ServiceView.manyErrors(CategoryErrors.NOT_FOUND));
      }
    }

    const serviceRepository = getCustomRepository(ServiceRepository);
    const service = await serviceRepository.findOne({
      id: req.params.id,
      worker,
    });

    if (!service) {
      return res
        .status(401)
        .json(ServiceView.manyErrors(ServiceErrors.NOT_FOUND));
    }

    next();
  }
}
