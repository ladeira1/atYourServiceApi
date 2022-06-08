"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceView = void 0;
const categoryView_1 = require("./categoryView");
const defaultView_1 = require("./defaultView");
const workerView_1 = require("./workerView");
class ServiceView extends defaultView_1.DefaultView {
    static returnService(service) {
        return {
            service: {
                id: service.id,
                name: service.name,
                minValue: service.minValue,
                thumbsUp: service.thumbsUp,
                timesProvided: service.timesProvided,
                description: service.description,
                images: service?.images ?? [],
                createdAt: service.createdAt,
                updatedAt: service.updatedAt,
                ...categoryView_1.CategoryView.returnCategory(service.category),
                ...workerView_1.WorkerView.returnWorker(service.worker),
            },
        };
    }
    static returnMany(services) {
        return services.map(service => this.returnService(service));
    }
}
exports.ServiceView = ServiceView;
