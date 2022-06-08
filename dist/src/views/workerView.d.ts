import { Worker } from '../entities/Worker';
import { DefaultView } from './defaultView';
export declare class WorkerView extends DefaultView {
    static returnWorker(worker: Worker): {
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
    };
}
