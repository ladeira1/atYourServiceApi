export var __esModule: boolean;
export class OfferView extends defaultView_1.DefaultView {
    static returnOffer(offer: any, withUser?: boolean): {
        createdAt: any;
        updatedAt: any;
        value: any;
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
        id: any;
        message: any;
        status: any;
        title: any;
    } | {
        createdAt: any;
        updatedAt: any;
        value: any;
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
        id: any;
        message: any;
        status: any;
        title: any;
    };
    static returnMany(offers: any): any;
}
import defaultView_1 = require("./defaultView");
