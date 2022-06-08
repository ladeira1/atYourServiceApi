export var __esModule: boolean;
export class ServiceView extends defaultView_1.DefaultView {
    static returnService(service: any): {
        service: {
            user: {
                id: any;
                name: any;
                email: any;
                phone: any;
                token: never;
                worker: {
                    cpfCnpj: any;
                    address: any;
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
    };
    static returnMany(services: any): any;
}
import defaultView_1 = require("./defaultView");
