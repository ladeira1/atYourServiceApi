import { EntityRepository, Repository } from 'typeorm';
import { Service } from '../entities/Service';

@EntityRepository(Service)
class ServiceRepository extends Repository<Service> {}

export { ServiceRepository };
