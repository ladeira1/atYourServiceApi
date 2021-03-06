import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { UserErrors } from '../errors/user';
import { UserRepository } from '../repositories/UserRepository';
import { UserView } from '../views/userView';

export class UserValidator {
  async get(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      id: Yup.string().required(UserErrors.ACCOUNT_NOT_FOUND),
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

      return res.status(401).json(UserView.manyErrors(validation));
    }

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ id: req.params.id });
    if (!user) {
      return res
        .status(401)
        .json(UserView.manyErrors(UserErrors.ACCOUNT_NOT_FOUND));
    }

    next();
  }

  async createAccount(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(UserErrors.REQUIRED_NAME),
      email: Yup.string().email().required(UserErrors.REQUIRED_EMAIL),
      city: Yup.string().required(UserErrors.REQUIRED_CITY),
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
        .json(UserView.manyErrors(UserErrors.EMAIL_ALREADY_IN_USE));
    }

    next();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email(UserErrors.INVALID_EMAIL)
        .required(UserErrors.REQUIRED_EMAIL),
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
      return res
        .status(401)
        .json(UserView.manyErrors(UserErrors.ACCOUNT_NOT_FOUND));
    }

    next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(UserErrors.REQUIRED_NAME),
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

    next();
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      oldPassword: Yup.string()
        .required(UserErrors.REQUIRED_PASSWORD)
        .min(6, UserErrors.INVALID_PASSWORD),
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

    next();
  }
}
