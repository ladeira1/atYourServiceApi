import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { OfferErrors } from '../errors/offer';
import { ServiceErrors } from '../errors/service';
import { OfferRepository } from '../repositories/OfferRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { UserRepository } from '../repositories/UserRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { OfferView } from '../views/offerView';

export class OfferValidator {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      title: Yup.string().required(OfferErrors.REQUIRED_TITLE),
      message: Yup.string().required(OfferErrors.REQUIRED_MESSAGE),
      value: Yup.number().required(OfferErrors.REQUIRED_VALUE),
      serviceId: Yup.number().required(OfferErrors.REQUIRED_SERVICE),
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
      return res.status(401).json(OfferView.manyErrors(validation));
    }

    const workerRepository = getCustomRepository(WorkerRepository);
    const worker = await workerRepository.findOne({ id: req.userId });

    const serviceRepository = getCustomRepository(ServiceRepository);
    const service = await serviceRepository.findOne({
      id: req.body.serviceId,
    });
    if (!service) {
      return res
        .status(404)
        .json(OfferView.manyErrors(ServiceErrors.NOT_FOUND));
    }

    if (worker?.id === service.worker?.id) {
      return res
        .status(401)
        .json(
          OfferView.manyErrors(
            OfferErrors.YOU_CANT_MAKE_AN_OFFER_FOR_YOUR_SERVICE,
          ),
        );
    }

    if (service.minValue > Number(req.body.value)) {
      return res
        .status(401)
        .json(
          OfferView.manyErrors(
            OfferErrors.VALUE_MUST_BE_HIGHER_THAN_SERVICE_MIN_VALUE,
          ),
        );
    }

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ id: req.userId });

    const offerRepository = getCustomRepository(OfferRepository);
    const offer = await offerRepository.findOne({
      service,
      user,
    });
    if (offer) {
      return res
        .status(401)
        .json(
          OfferView.manyErrors(
            OfferErrors.ALREADY_EXISTS_FOR_THIS_USER_AND_SERVICE,
          ),
        );
    }

    next();
  }
}
