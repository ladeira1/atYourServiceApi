import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { WorkerRepository } from '../repositories/WorkerRepository';
import { WorkerView } from '../views/workerView';

class WorkerController {
  async find(id: string) {
    const workerRepository = getCustomRepository(WorkerRepository);
    return workerRepository.findOne({ id });
  }

  async create(req: Request, res: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const workerRepository = getCustomRepository(WorkerRepository);
      let user: User;

      if ('userId' in req.body) {
        user = await userRepository.findOne({ id: req.body.userId });
      } else {
        const { name, email, phone, password } = req.body;

        user = userRepository.create({
          name,
          email,
          phone,
        });
        user.hashPassword(password);

        await userRepository.save(user);
      }

      const worker = workerRepository.create({
        id: user.id,
        user,
        cpfCnpj: req.body.cpfCnpj,
        address: req.body.address,
      });

      await workerRepository.save(worker);

      res.status(201).json(WorkerView.returnWorker(worker));
    } catch (err) {
      res.status(401).json(WorkerView.error(err));
    }
  }
}

export { WorkerController };
