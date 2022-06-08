import { Repository } from 'typeorm';
import { Worker } from '../entities/Worker';
declare class WorkerRepository extends Repository<Worker> {
}
export { WorkerRepository };
