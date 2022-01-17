import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { OfferErrors } from '../errors/offer';
import { ServiceErrors } from '../errors/service';
import { UserErrors } from '../errors/user';
import { WorkerErrors } from '../errors/worker';
import { OfferRepository } from '../repositories/OfferRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { UserRepository } from '../repositories/UserRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { Status } from '../types/Status';
import { OfferView } from '../views/offerView';

export class OfferValidator {
  async list(req: Request, res: Response, next: NextFunction) {
    const workerRepository = getCustomRepository(WorkerRepository);
    const worker = await workerRepository.findOne({ id: req.userId });
    if (!worker) {
      return res.status(404).json(OfferView.manyErrors(WorkerErrors.NOT_FOUND));
    }

    next();
  }

  async listByUser(req: Request, res: Response, next: NextFunction) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ id: req.userId });
    if (!user) {
      return res
        .status(404)
        .json(OfferView.manyErrors(UserErrors.ACCOUNT_NOT_FOUND));
    }

    next();
  }

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

  async delete(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      id: Yup.number().required(OfferErrors.NOT_FOUND),
    });

    if (!(await schema.isValid(req.params))) {
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

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ id: req.userId });

    const offerRepository = getCustomRepository(OfferRepository);
    const offer = await offerRepository.findOne({
      id: req.params.id,
    });
    if (!offer || offer?.user.id !== user.id) {
      return res
        .status(401)
        .json(
          OfferView.manyErrors(OfferErrors.YOU_CAN_ONLY_DELETE_YOUR_OWN_OFFER),
        );
    }

    next();
  }

  async createOrDelete(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      status: Yup.string()
        .oneOf([Status.ACCEPTED, Status.FINISHED, Status.PENDING])
        .required(OfferErrors.REQUIRED_STATUS),
      id: Yup.number().required(OfferErrors.NOT_FOUND),
    });

    if (!(await schema.isValid({ ...req.body, ...req.params }))) {
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

    const offerRepository = getCustomRepository(OfferRepository);
    const offer = await offerRepository.findOne({
      id: req.params.id,
    });
    if (!offer || offer?.service.worker.id !== req.userId) {
      return res
        .status(401)
        .json(
          OfferView.manyErrors(OfferErrors.YOU_CAN_ONLY_UPDATE_YOUR_OWN_OFFER),
        );
    }

    next();
  }
}
