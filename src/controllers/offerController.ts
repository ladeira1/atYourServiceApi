/* eslint-disable no-await-in-loop */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { Offer } from '../entities/Offer';
import { OfferRepository } from '../repositories/OfferRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { UserRepository } from '../repositories/UserRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
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
        status: false,
        service,
        user,
      });

      await offerRepository.save(offer);
      return res.status(201).json(OfferView.returnOffer(offer));
    } catch (err) {
      res.status(401).json(OfferView.manyErrors(err));
    }
  }
}

export { OfferController };
