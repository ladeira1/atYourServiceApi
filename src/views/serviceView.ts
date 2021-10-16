import { Service } from '../entities/Service';
import { DefaultView } from './defaultView';
import { WorkerView } from './workerView';

export class ServiceView extends DefaultView {
  static returnService(service: Service) {
    return {
      service: {
        name: service.name,
        minValue: service.minValue,
        thumbsUp: service.thumbsUp,
        timesProvided: service.timesProvided,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        ...WorkerView.returnWorker(service.worker),
      },
    };
  }

  static returnMany(services: Service[]) {
    return services.map(service => this.returnService(service));
  }
}
