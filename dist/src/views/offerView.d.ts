import { Offer } from '../entities/Offer';
import { DefaultView } from './defaultView';
export declare class OfferView extends DefaultView {
    static returnOffer(offer: Offer, withUser?: boolean): {
        createdAt: Date;
        updatedAt: Date;
        value: number;
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
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            city: string;
            token: false;
        };
        id: string;
        message: string;
        status: string;
        title: string;
    } | {
        createdAt: Date;
        updatedAt: Date;
        value: number;
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
        id: string;
        message: string;
        status: string;
        title: string;
    };
    static returnMany(offers: Offer[]): ({
        createdAt: Date;
        updatedAt: Date;
        value: number;
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
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            city: string;
            token: false;
        };
        id: string;
        message: string;
        status: string;
        title: string;
    } | {
        createdAt: Date;
        updatedAt: Date;
        value: number;
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
        id: string;
        message: string;
        status: string;
        title: string;
    })[];
}
