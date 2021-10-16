import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { ServiceView } from '../views/serviceView';
import { WorkerController } from './workerController';

class ServiceController {
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
