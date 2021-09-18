import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { UserErrors } from '../errors/user';
import { UserRepository } from '../repositories/UserRepository';
import { UserView } from '../views/userView';

export class UserValidator {
  async createAccount(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(UserErrors.REQUIRED_NAME),
      email: Yup.string().email().required(UserErrors.REQUIRED_EMAIL),
      password: Yup.string()
        .required(UserErrors.REQUIRED_PASSWORD)
        .min(6, UserErrors.INVALID_PASSWORD),
      passwordConfirmation: Yup.string()
        .required(UserErrors.REQUIRED_PASSWORD_CONFIRMATION)
        .min(6, UserErrors.INVALID_PASSWORD_CONFIRMATION)
        .oneOf([Yup.ref('password')], UserErrors.INVALID_PASSWORD_CONFIRMATION),
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

      return res.status(401).json(UserView.manyErrors(validation));
    }

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(401)
        .json(UserView.error(UserErrors.EMAIL_ALREADY_IN_USE));
    }

    next();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(UserErrors.REQUIRED_EMAIL),
      password: Yup.string()
        .required(UserErrors.REQUIRED_PASSWORD)
        .min(6, UserErrors.INVALID_PASSWORD),
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

      return res.status(401).json(UserView.manyErrors(validation));
    }

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json(UserView.error(UserErrors.ACCOUNT_NOT_FOUND));
    }

    next();
  }
}
