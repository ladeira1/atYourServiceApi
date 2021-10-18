import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ServiceErrors } from '../errors/service';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { ServiceView } from '../views/serviceView';
import { WorkerController } from './workerController';

class ServiceController {
  async list(req: Request, res: Response) {
    try {
      const serviceRepository = getCustomRepository(ServiceRepository);
      const services = await serviceRepository.find();

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

      return res.status(201).json(ServiceView.returnService(service));
    } catch (err) {
      return res.status(401).json(ServiceView.manyErrors(err));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const {
        userId,
        params: { id },
      } = req;

      const workerRepository = getCustomRepository(WorkerRepository);
      const worker = await workerRepository.findOne({
        id: userId,
      });

      if (!worker) {
        return res
          .status(401)
          .json(ServiceView.manyErrors(ServiceErrors.INVALID_WORKER));
      }

      const serviceRepository = getCustomRepository(ServiceRepository);
      const service = await serviceRepository.findOne({
        id,
        worker,
      });

      if (!service) {
        return res
          .status(401)
          .json(ServiceView.manyErrors(ServiceErrors.NOT_FOUND));
      }

      await serviceRepository.remove(service);

      return res.status(204).send();
    } catch (err) {
      return res.status(401).json(ServiceView.manyErrors(err));
    }
  }
}

export { ServiceController };
