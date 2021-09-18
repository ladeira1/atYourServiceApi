import { Worker } from '../entities/Worker';
import { getToken } from '../utils/getToken';
import { DefaultView } from './defaultView';

export class WorkerView extends DefaultView {
  static returnWorker(worker: Worker) {
    return {
      user: {
        name: worker.user.name,
        email: worker.user.email,
        phone: worker.user.phone,
        cpfCnpj: worker.cpfCnpj,
        address: worker.address,
      },
      token: getToken(worker.user.id),
    };
  }
}
