import { Service } from '../entities/Service';
import { DefaultView } from './defaultView';

export class ServiceView extends DefaultView {
  static returnService(service: Service) {
    return {
      service,
    };
  }

  static returnMany(services: Service[]) {
    return services.map(service => this.returnService(service));
  }
}
