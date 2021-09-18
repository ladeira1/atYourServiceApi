import { EntityRepository, Repository } from 'typeorm';
import { Worker } from '../entities/Worker';

@EntityRepository(Worker)
class WorkerRepository extends Repository<Worker> {}

export { WorkerRepository };
