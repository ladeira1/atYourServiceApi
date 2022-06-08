import { Service } from './Service';
import { User } from './User';
declare class Worker {
    id: string;
    user: User;
    cpfCnpj: string;
    address: string;
    services: Service[];
}
export { Worker };
