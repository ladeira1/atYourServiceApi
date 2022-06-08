import { Offer } from './Offer';
import { Worker } from './Worker';
declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
    worker: Worker;
    offers: Offer[];
    constructor();
    hashPassword(password: string): void;
    validatePassword(password: string): boolean;
}
export { User };
