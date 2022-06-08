"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerController = void 0;
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../repositories/UserRepository");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const workerView_1 = require("../views/workerView");
class WorkerController {
    async find(id) {
        const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
        const worker = await workerRepository.findOne({ id });
        if (!worker)
            return null;
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ id });
        worker.user = user;
        return worker;
    }
    async create(req, res) {
        try {
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
            let user;
            if ('userId' in req.body) {
                user = await userRepository.findOne({ id: req.body.userId });
            }
            else {
                const { name, email, city, phone, password } = req.body;
                user = userRepository.create({
                    name,
                    email,
                    phone,
                    city,
                });
                user.hashPassword(password);
                await userRepository.save(user);
            }
            const worker = workerRepository.create({
                id: user.id,
                user,
                cpfCnpj: req.body.cpfCnpj,
                address: req.body.address,
            });
            await workerRepository.save(worker);
            res.status(201).json(workerView_1.WorkerView.returnWorker(worker));
        }
        catch (err) {
            res.status(401).json(workerView_1.WorkerView.manyErrors(err));
        }
    }
}
exports.WorkerController = WorkerController;
//# sourceMappingURL=workerController.js.map