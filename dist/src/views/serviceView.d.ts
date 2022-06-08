import { Service } from '../entities/Service';
import { DefaultView } from './defaultView';
export declare class ServiceView extends DefaultView {
    static returnService(service: Service): {
        service: {
            user: {
                id: string;
                name: string;
                email: string;
                phone: string;
                token: never;
                worker: {
                    cpfCnpj: string;
                    address: string;
                };
            };
            category: import("../entities/Category").Category;
            id: string;
            name: string;
            minValue: number;
            thumbsUp: number;
            timesProvided: number;
            description: string;
            images: import("../entities/Image").Image[];
            createdAt: Date;
            updatedAt: Date;
        };
    };
    static returnMany(services: Service[]): {
        service: {
            user: {
                id: string;
                name: string;
                email: string;
                phone: string;
                token: never;
                worker: {
                    cpfCnpj: string;
                    address: string;
                };
            };
            category: import("../entities/Category").Category;
            id: string;
            name: string;
            minValue: number;
            thumbsUp: number;
            timesProvided: number;
            description: string;
            images: import("../entities/Image").Image[];
            createdAt: Date;
            updatedAt: Date;
        };
    }[];
}
