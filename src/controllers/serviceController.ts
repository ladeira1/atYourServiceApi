import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { ServiceView } from '../views/serviceView';

class ServiceController {
  async create(req: Request, res: Response) {
    try {
      const {
        body: { name, minValue, categoryId },
        userId,
      } = req;

      const workerRepository = getCustomRepository(WorkerRepository);
      const worker = await workerRepository.findOne({ id: userId });

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
      res.status(401).json(ServiceView.error(err));
    }
  }
}

export { ServiceController };
