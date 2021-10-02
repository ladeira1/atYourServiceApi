import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserErrors } from '../errors/user';
import { UserRepository } from '../repositories/UserRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
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

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req;
      const userRepository = getCustomRepository(UserRepository);
      const workerRepository = getCustomRepository(WorkerRepository);

      const workerController = new WorkerController();
      const worker = await workerController.find(userId);
      if (worker) {
        await workerRepository.remove(worker);
      }

      const user = await userRepository.findOne({ id: userId });
      await userRepository.remove(user);

      return res.status(204).send();
    } catch (err) {
      res.status(401).json(UserView.error(err.message));
    }
  }
}

export { UserController };
