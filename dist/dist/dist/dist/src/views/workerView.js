"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerView = void 0;
const getToken_1 = require("../utils/getToken");
const defaultView_1 = require("./defaultView");
class WorkerView extends defaultView_1.DefaultView {
    static returnWorker(worker) {
        return {
            user: {
                id: worker.user.id,
                name: worker.user.name,
                email: worker.user.email,
                phone: worker.user.phone,
                token: (0, getToken_1.getToken)(worker.user.id),
                worker: {
                    cpfCnpj: worker.cpfCnpj,
                    address: worker.address,
                },
            },
        };
    }
}
exports.WorkerView = WorkerView;
//# sourceMappingURL=workerView.js.map