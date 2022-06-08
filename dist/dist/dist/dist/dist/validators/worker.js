"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1)
                throw t[1];
            return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerValidator = void 0;
var typeorm_1 = require("typeorm");
var Yup = __importStar(require("yup"));
var brazilian_values_1 = require("brazilian-values");
var user_1 = require("../errors/user");
var UserRepository_1 = require("../repositories/UserRepository");
var userView_1 = require("../views/userView");
var worker_1 = require("../errors/worker");
var WorkerRepository_1 = require("../repositories/WorkerRepository");
var workerView_1 = require("../views/workerView");
var WorkerValidator = (function () {
    function WorkerValidator() {
    }
    WorkerValidator.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, userRepository, user, validation, workerRepository, worker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('userId' in req.body))
                            return [3, 2];
                        schema = Yup.object().shape({
                            userId: Yup.string().required(user_1.UserErrors.ACCOUNT_NOT_FOUND),
                            address: Yup.string().required(worker_1.WorkerErrors.REQUIRED_ADDRESS),
                            cpfCnpj: Yup.string()
                                .required(worker_1.WorkerErrors.REQUIRED_CPF_CNPJ)
                                .test('INVALID_CPF_CNPJ', worker_1.WorkerErrors.INVALID_CPF_CNPJ, function (value) { return (0, brazilian_values_1.isCPFOrCNPJ)(value); }),
                        });
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4, userRepository.findOne({ id: req.body.userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2, res
                                    .status(401)
                                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND))];
                        }
                        return [3, 3];
                    case 2:
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
                                .test('INVALID_CPF_CNPJ', worker_1.WorkerErrors.INVALID_CPF_CNPJ, function (value) { return (0, brazilian_values_1.isCPFOrCNPJ)(value); }),
                        });
                        _a.label = 3;
                    case 3: return [4, schema.isValid(req.body)];
                    case 4:
                        if (!!(_a.sent()))
                            return [3, 6];
                        return [4, schema
                                .validate(req.body, {
                                abortEarly: false,
                            })
                                .catch(function (err) {
                                var errors = err.errors.map(function (message) {
                                    return message;
                                });
                                return errors;
                            })];
                    case 5:
                        validation = _a.sent();
                        return [2, res.status(401).json(userView_1.UserView.manyErrors(validation))];
                    case 6:
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4, workerRepository.findOne({
                                cpfCnpj: req.body.cpfCnpj,
                            })];
                    case 7:
                        worker = _a.sent();
                        if (worker) {
                            return [2, res
                                    .status(401)
                                    .json(workerView_1.WorkerView.manyErrors(worker_1.WorkerErrors.ACCOUNT_ALREADY_EXISTS))];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    return WorkerValidator;
}());
exports.WorkerValidator = WorkerValidator;
//# sourceMappingURL=worker.js.map