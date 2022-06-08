import { Repository } from 'typeorm';
import { Service } from '../entities/Service';
declare class ServiceRepository extends Repository<Service> {
}
export { ServiceRepository };
