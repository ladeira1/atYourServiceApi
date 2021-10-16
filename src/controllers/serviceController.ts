import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ServiceErrors } from '../errors/service';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { ServiceView } from '../views/serviceView';
import { WorkerController } from './workerController';

class ServiceController {
  async list(req: Request, res: Response) {
    try {
      const serviceRepository = getCustomRepository(ServiceRepository);
      const services = await serviceRepository.find({});
      console.log(services);

      return res.status(200).json(ServiceView.returnMany(services));
    } catch (err) {
      return res.status(401).json(ServiceView.manyErrors(err));
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const serviceRepository = getCustomRepository(ServiceRepository);
      const service = await serviceRepository.findOne({ id });

      if (!service) {
        return res
          .status(422)
          .json(ServiceView.manyErrors(ServiceErrors.NOT_FOUND));
      }

      console.log(service);

      return res.status(200).json(ServiceView.returnService(service));
    } catch (err) {
      return res.status(401).json(ServiceView.manyErrors(err));
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        body: { name, minValue, categoryId },
        userId,
      } = req;

      const workerController = new WorkerController();
      const worker = await workerController.find(userId);

      const categoryRepository = getCustomRepository(CategoryRepository);
      const category = await categoryRepository.findOne({ id: categoryId });

      const serviceRepository = getCustomRepository(ServiceRepository);
      const service = serviceRepository.create({
        name,
        minValue,
        category,
        timesProvided: 0,
        thumbsUp: 0,
        worker,
      });

      await serviceRepository.save(service);

      res.status(201).json(ServiceView.returnService(service));
    } catch (err) {
      res.status(401).json(ServiceView.manyErrors(err));
    }
  }
}

export { ServiceController };
