import { Service } from './Service';
import { User } from './User';
declare class Offer {
    id: string;
    title: string;
    message: string;
    value: number;
    status: string;
    thumbsUp: number;
    createdAt: Date;
    updatedAt: Date;
    service: Service;
    user: User;
}
export { Offer };
