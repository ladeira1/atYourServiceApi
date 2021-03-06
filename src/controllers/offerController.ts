/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { Offer } from '../entities/Offer';
import { OfferRepository } from '../repositories/OfferRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { UserRepository } from '../repositories/UserRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { Status } from '../types/Status';
import { OfferView } from '../views/offerView';

class OfferController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const offerRepository = getCustomRepository(OfferRepository);
      const offer = await offerRepository.findOne({ id });
      if (!offer) return res.status(200).json([]);

      return res.status(200).json(OfferView.returnOffer(offer));
    } catch (err) {
      return res.status(401).json(OfferView.manyErrors(err));
    }
  }

  async listByWorker(req: Request, res: Response) {
    try {
      const { userId } = req;

      const workerRepository = getCustomRepository(WorkerRepository);
      const worker = await workerRepository.findOne({ id: userId });

      const serviceRepository = getCustomRepository(ServiceRepository);
      const services = await serviceRepository.find({ where: { worker } });

      const offers: Offer[] = [];

      const offerRepository = getCustomRepository(OfferRepository);
      for (let i = 0; i < services?.length; i++) {
        const serviceOffers = await offerRepository.find({
          where: { service: services[i] },
        });
        if (serviceOffers && serviceOffers.length > 0) {
          offers.push(...serviceOffers);
        }
      }

      return res.status(200).json(OfferView.returnMany(offers));
    } catch (err) {
      res.status(401).json(OfferView.manyErrors(err));
    }
  }

  async listByUser(req: Request, res: Response) {
    try {
      const { userId } = req;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne({ id: userId });

      const offerRepository = getCustomRepository(OfferRepository);
      const offers = await offerRepository.find({ user });

      return res.status(200).json(OfferView.returnMany(offers));
    } catch (err) {
      res.status(401).json(OfferView.manyErrors(err));
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        body: { title, message, value, serviceId },
        userId,
      } = req;

      const serviceRepository = getCustomRepository(ServiceRepository);
      const service = await serviceRepository.findOne({ id: serviceId });

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne({ id: userId });

      const offerRepository = getCustomRepository(OfferRepository);
      const offer = offerRepository.create({
        title,
        message,
        value,
        status: Status.PENDING,
        service,
        user,
      });

      await offerRepository.save(offer);
      return res.status(201).json(OfferView.returnOffer(offer));
    } catch (err) {
      res.status(401).json(OfferView.manyErrors(err));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const offerRepository = getCustomRepository(OfferRepository);
      const offer = await offerRepository.findOne({ id });
      await offerRepository.remove(offer);

      return res.status(204).send();
    } catch (err) {
      return res.status(401).json(OfferView.manyErrors(err));
    }
  }

  async complete(req: Request, res: Response) {
    try {
      const {
        params: { id },
        body: { thumbsUp },
      } = req;

      const offerRepository = getCustomRepository(OfferRepository);
      const offer = await offerRepository.findOne({ where: { id } });
      offer.status = Status.DONE;
      offer.thumbsUp = thumbsUp;

      const serviceRepository = getCustomRepository(ServiceRepository);
      const service = await serviceRepository.findOne({
        where: { id: offer.service.id },
      });
      service.timesProvided += 1;

      const oldOffers = await offerRepository.find({
        where: { service, status: Status.DONE },
      });

      const newThumbsUpCount = oldOffers.reduce(
        (accumulator: number, item: Offer) => {
          accumulator += Number(item?.thumbsUp) ?? 0;
          return Number(accumulator);
        },
        thumbsUp,
      );

      service.thumbsUp = newThumbsUpCount / service.timesProvided;
      offer.service = service;

      await serviceRepository.save(service);
      await offerRepository.save(offer);

      return res.status(200).json(OfferView.returnOffer(offer));
    } catch (err) {
      return res.status(401).json(OfferView.manyErrors(err));
    }
  }

  async acceptOrRefuse(req: Request, res: Response) {
    try {
      const {
        params: { id },
        body: { status },
      } = req;

      const offerRepository = getCustomRepository(OfferRepository);
      const offer = await offerRepository.findOne({ where: { id } });
      offer.status = status;

      await offerRepository.save(offer);

      return res.status(200).json(OfferView.returnOffer(offer));
    } catch (err) {
      return res.status(401).json(OfferView.manyErrors(err));
    }
  }
}

export { OfferController };
