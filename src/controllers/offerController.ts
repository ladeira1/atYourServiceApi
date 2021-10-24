import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { OfferRepository } from '../repositories/OfferRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { UserRepository } from '../repositories/UserRepository';
import { CategoryView } from '../views/categoryView';
import { OfferView } from '../views/offerView';

class OfferController {
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
