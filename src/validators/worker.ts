import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { isCPFOrCNPJ } from 'brazilian-values';
import { UserErrors } from '../errors/user';
import { UserRepository } from '../repositories/UserRepository';
import { UserView } from '../views/userView';
import { WorkerErrors } from '../errors/worker';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { WorkerView } from '../views/workerView';

export class WorkerValidator {
  async create(req: Request, res: Response, next: NextFunction) {
    let schema: Yup.AnyObjectSchema;

    if ('userId' in req.body) {
      schema = Yup.object().shape({
        userId: Yup.string().required(UserErrors.ACCOUNT_NOT_FOUND),
        address: Yup.string().required(WorkerErrors.REQUIRED_ADDRESS),
        cpfCnpj: Yup.string()
          .required(WorkerErrors.REQUIRED_CPF_CNPJ)
          .test(
            'INVALID_CPF_CNPJ',
            WorkerErrors.INVALID_CPF_CNPJ,
            (value: string) => isCPFOrCNPJ(value),
          ),
      });

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne({ id: req.body.userId });
      if (!user) {
        return res
          .status(401)
          .json(UserView.error(UserErrors.ACCOUNT_NOT_FOUND));
      }
    } else {
      schema = Yup.object().shape({
        name: Yup.string().required(UserErrors.REQUIRED_NAME),
        email: Yup.string().email().required(UserErrors.REQUIRED_EMAIL),
        password: Yup.string()
          .required(UserErrors.REQUIRED_PASSWORD)
          .min(6, UserErrors.INVALID_PASSWORD),
        passwordConfirmation: Yup.string()
          .required(UserErrors.REQUIRED_PASSWORD_CONFIRMATION)
          .min(6, UserErrors.INVALID_PASSWORD_CONFIRMATION)
          .oneOf(
            [Yup.ref('password')],
            UserErrors.INVALID_PASSWORD_CONFIRMATION,
          ),
        address: Yup.string().required(WorkerErrors.REQUIRED_ADDRESS),
        cpfCnpj: Yup.string()
          .required(WorkerErrors.REQUIRED_CPF_CNPJ)
          .test(
            'INVALID_CPF_CNPJ',
            WorkerErrors.INVALID_CPF_CNPJ,
            (value: string) => isCPFOrCNPJ(value),
          ),
      });
    }

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

      return res.status(401).json(UserView.manyErrors(validation));
    }

    const workerRepository = getCustomRepository(WorkerRepository);
    const worker = await workerRepository.findOne({
      cpfCnpj: req.body.cpfCnpj,
    });
    if (worker) {
      return res
        .status(401)
        .json(WorkerView.error(WorkerErrors.ACCOUNT_ALREADY_EXISTS));
    }

    next();
  }
}
