export var __esModule: boolean;
export class ServiceView extends defaultView_1.DefaultView {
    static returnService(service: any): {
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
    };
    static returnMany(services: any): any;
}
import defaultView_1 = require("./defaultView");
