import { Worker } from '../entities/Worker';
import { getToken } from '../utils/getToken';
import { DefaultView } from './defaultView';
import { UserView } from './userView';

export class WorkerView extends DefaultView {
  static returnWorker(worker: Worker) {
    return {
      ...UserView.returnUser(worker.user),
      worker: {
        cpfCnpj: worker.cpfCnpj,
        address: worker.address,
      },
      token: getToken(worker.user.id),
    };
  }
}