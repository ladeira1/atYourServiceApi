import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserErrors } from '../errors/user';
import { UserRepository } from '../repositories/UserRepository';
import { UserView } from '../views/userView';
import { WorkerView } from '../views/workerView';
import { WorkerController } from './workerController';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const user = userRepository.create({
        name,
        email,
        phone,
      });
      user.hashPassword(password);

      await userRepository.save(user);
      res.status(201).json(UserView.returnUser(user));
    } catch (err) {
      res.status(401).json(UserView.error(err));
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findOne({ email });
      if (!user.validatePassword(password)) {
        throw new Error(UserErrors.INVALID_PASSWORD);
      }

      const workerController = new WorkerController();
      const worker = await workerController.find(user.id);
      if (worker) {
        worker.user = user;
        return res.status(200).json(WorkerView.returnWorker(worker));
      }

      return res.status(200).json(UserView.returnUser(user));
    } catch (err) {
      res.status(401).json(UserView.error(err.message));
    }
  }
}

export { UserController };
