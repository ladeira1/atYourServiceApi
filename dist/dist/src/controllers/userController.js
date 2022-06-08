"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../errors/user");
const UserRepository_1 = require("../repositories/UserRepository");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const userView_1 = require("../views/userView");
const workerView_1 = require("../views/workerView");
const workerController_1 = require("./workerController");
class UserController {
    async get(req, res) {
        try {
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({
                where: { id: req?.params?.id },
            });
            const workerController = new workerController_1.WorkerController();
            const worker = await workerController.find(user.id);
            if (worker) {
                worker.user = user;
                return res.status(200).json(workerView_1.WorkerView.returnWorker(worker));
            }
            return res.status(200).json(userView_1.UserView.returnUser(user, false));
        }
        catch (err) {
            res.status(401).json(userView_1.UserView.manyErrors(err.message));
        }
    }
    async create(req, res) {
        try {
            const { name, email, city, password, phone } = req.body;
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = userRepository.create({
                name,
                email,
                phone,
                city,
            });
            user.hashPassword(password);
            await userRepository.save(user);
            res.status(201).json(userView_1.UserView.returnUser(user));
        }
        catch (err) {
            res.status(401).json(userView_1.UserView.manyErrors(err));
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({
                where: { email },
            });
            if (!user.validatePassword(password)) {
                throw new Error(user_1.UserErrors.INVALID_PASSWORD);
            }
            const workerController = new workerController_1.WorkerController();
            const worker = await workerController.find(user.id);
            if (worker) {
                worker.user = user;
                return res.status(200).json(workerView_1.WorkerView.returnWorker(worker));
            }
            return res.status(200).json(userView_1.UserView.returnUser(user));
        }
        catch (err) {
            res.status(401).json(userView_1.UserView.manyErrors(err.message));
        }
    }
    async delete(req, res) {
        try {
            const { userId } = req;
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
            const workerController = new workerController_1.WorkerController();
            const worker = await workerController.find(userId);
            if (worker) {
                await workerRepository.remove(worker);
            }
            const user = await userRepository.findOne({ id: userId });
            await userRepository.remove(user);
            return res.status(204).send();
        }
        catch (err) {
            res.status(401).json(userView_1.UserView.manyErrors(err.message));
        }
    }
    async update(req, res) {
        try {
            const { userId, body: { name }, } = req;
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({ id: userId });
            user.name = name;
            await userRepository.save(user);
            return res.status(200).json(userView_1.UserView.returnUser(user));
        }
        catch (err) {
            return res.status(400).json(userView_1.UserView.manyErrors(err.message));
        }
    }
    async updatePassword(req, res) {
        try {
            const { userId, body: { oldPassword, password }, } = req;
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({ id: userId });
            if (!user.validatePassword(oldPassword)) {
                return res
                    .status(400)
                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.WRONG_PASSWORD));
            }
            user.hashPassword(password);
            await userRepository.save(user);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(400).json(userView_1.UserView.manyErrors(err.message));
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map