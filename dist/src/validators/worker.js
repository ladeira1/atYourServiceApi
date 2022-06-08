"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerValidator = void 0;
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const brazilian_values_1 = require("brazilian-values");
const user_1 = require("../errors/user");
const UserRepository_1 = require("../repositories/UserRepository");
const userView_1 = require("../views/userView");
const worker_1 = require("../errors/worker");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const workerView_1 = require("../views/workerView");
class WorkerValidator {
    async create(req, res, next) {
        let schema;
        if ('userId' in req.body) {
            schema = Yup.object().shape({
                userId: Yup.string().required(user_1.UserErrors.ACCOUNT_NOT_FOUND),
                address: Yup.string().required(worker_1.WorkerErrors.REQUIRED_ADDRESS),
                cpfCnpj: Yup.string()
                    .required(worker_1.WorkerErrors.REQUIRED_CPF_CNPJ)
                    .test('INVALID_CPF_CNPJ', worker_1.WorkerErrors.INVALID_CPF_CNPJ, (value) => (0, brazilian_values_1.isCPFOrCNPJ)(value)),
            });
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({ id: req.body.userId });
            if (!user) {
                return res
                    .status(401)
                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND));
            }
        }
        else {
            schema = Yup.object().shape({
                name: Yup.string().required(user_1.UserErrors.REQUIRED_NAME),
                email: Yup.string().email().required(user_1.UserErrors.REQUIRED_EMAIL),
                password: Yup.string()
                    .required(user_1.UserErrors.REQUIRED_PASSWORD)
                    .min(6, user_1.UserErrors.INVALID_PASSWORD),
                passwordConfirmation: Yup.string()
                    .required(user_1.UserErrors.REQUIRED_PASSWORD_CONFIRMATION)
                    .min(6, user_1.UserErrors.INVALID_PASSWORD_CONFIRMATION)
                    .oneOf([Yup.ref('password')], user_1.UserErrors.INVALID_PASSWORD_CONFIRMATION),
                address: Yup.string().required(worker_1.WorkerErrors.REQUIRED_ADDRESS),
                cpfCnpj: Yup.string()
                    .required(worker_1.WorkerErrors.REQUIRED_CPF_CNPJ)
                    .test('INVALID_CPF_CNPJ', worker_1.WorkerErrors.INVALID_CPF_CNPJ, (value) => (0, brazilian_values_1.isCPFOrCNPJ)(value)),
            });
        }
        if (!(await schema.isValid(req.body))) {
            const validation = await schema
                .validate(req.body, {
                abortEarly: false,
            })
                .catch(err => {
                const errors = err.errors.map((message) => {
                    return message;
                });
                return errors;
            });
            return res.status(401).json(userView_1.UserView.manyErrors(validation));
        }
        const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
        const worker = await workerRepository.findOne({
            cpfCnpj: req.body.cpfCnpj,
        });
        if (worker) {
            return res
                .status(401)
                .json(workerView_1.WorkerView.manyErrors(worker_1.WorkerErrors.ACCOUNT_ALREADY_EXISTS));
        }
        next();
    }
}
exports.WorkerValidator = WorkerValidator;
//# sourceMappingURL=worker.js.map