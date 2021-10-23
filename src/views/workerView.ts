import { Worker } from '../entities/Worker';
import { getToken } from '../utils/getToken';
import { DefaultView } from './defaultView';

export class WorkerView extends DefaultView {
  static returnWorker(worker: Worker) {
    return {
      user: {
        id: worker.user.id,
        name: worker.user.name,
        email: worker.user.email,
        phone: worker.user.phone,
        token: getToken(worker.user.id),
        worker: {
          cpfCnpj: worker.cpfCnpj,
          address: worker.address,
        },
      },
    };
  }
}
