import { Service } from './Service';
declare class Category {
    id: string;
    name: string;
    services: Service[];
    createdAt: Date;
    updatedAt: Date;
}
export { Category };
