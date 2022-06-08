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
            category: any;
            id: any;
            name: any;
            minValue: any;
            thumbsUp: any;
            timesProvided: any;
            description: any;
            images: any;
            createdAt: any;
            updatedAt: any;
        };
        user: {
            id: any;
            name: any;
            email: any;
            phone: any;
            city: any;
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
            category: any;
            id: any;
            name: any;
            minValue: any;
            thumbsUp: any;
            timesProvided: any;
            description: any;
            images: any;
            createdAt: any;
            updatedAt: any;
        };
        id: any;
        message: any;
        status: any;
        title: any;
    };
    static returnMany(offers: any): any;
}
import defaultView_1 = require("./defaultView");
