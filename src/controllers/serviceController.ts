/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import imgbbUploader from 'imgbb-uploader';
import { ServiceErrors } from '../errors/service';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { ServiceView } from '../views/serviceView';
import { WorkerController } from './workerController';
import { ImageRepository } from '../repositories/ImageRepository';
import { Image } from '../entities/Image';

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
        files,
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

      const imageRepository = getCustomRepository(ImageRepository);
      const images: Image[] = [];

      if (files && Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const response = await imgbbUploader(
            process.env.IMGBB_API_KEY,
            file.path,
          );

          const image = imageRepository.create({
            url: response.url,
            service,
          });

          await imageRepository.save(image);
          images.push(image);
        }
      }

      service.images = images;
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

  async update(req: Request, res: Response) {
    try {
      const {
        body: { name, minValue, categoryId },
        params: { id },
        files,
      } = req;

      const serviceRepository = getCustomRepository(ServiceRepository);
      const service = await serviceRepository.findOne({ id });

      if (name) service.name = name;
      if (minValue) service.minValue = minValue;
      if (categoryId) {
        const categoryRepository = getCustomRepository(CategoryRepository);
        const category = await categoryRepository.findOne({ id: categoryId });

        service.category = category;
      }

      const imageRepository = getCustomRepository(ImageRepository);
      const images: Image[] = [];

      if (files && Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const response = await imgbbUploader(
            process.env.IMGBB_API_KEY,
            file.path,
          );

          const image = imageRepository.create({
            url: response.url,
            service,
          });

          await imageRepository.save(image);
          images.push(image);
        }
      }

      console.log(images);

      service.images = images;
      await serviceRepository.save(service);

      return res.status(200).json(ServiceView.returnService(service));
    } catch (err) {
      return res.status(401).json(ServiceView.manyErrors(err));
    }
  }
}

export { ServiceController };
