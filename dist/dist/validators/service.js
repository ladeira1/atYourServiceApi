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
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
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
exports.ServiceValidator = void 0;
var typeorm_1 = require("typeorm");
var Yup = __importStar(require("yup"));
var category_1 = require("../errors/category");
var service_1 = require("../errors/service");
var CategoryRepository_1 = require("../repositories/CategoryRepository");
var ServiceRepository_1 = require("../repositories/ServiceRepository");
var WorkerRepository_1 = require("../repositories/WorkerRepository");
var serviceView_1 = require("../views/serviceView");
var ServiceValidator = (function () {
    function ServiceValidator() {
    }
    ServiceValidator.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, workerRepository, worker, categoryRepository, category, serviceRepository, service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string().required(service_1.ServiceErrors.REQUIRED_NAME),
                            minValue: Yup.number().required(service_1.ServiceErrors.REQUIRED_MIN_VALUE),
                            categoryId: Yup.number().required(service_1.ServiceErrors.REQUIRED_CATEGORY_ID),
                            description: Yup.string().required(service_1.ServiceErrors.REQUIRED_DESCRIPTION),
                        });
                        return [4, schema.isValid(req.body)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
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
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(validation))];
                    case 3:
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4, workerRepository.findOne({ id: req.userId })];
                    case 4:
                        worker = _a.sent();
                        if (!worker) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_A_WORKER))];
                        }
                        categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
                        return [4, categoryRepository.findOne({
                                id: req.body.categoryId,
                            })];
                    case 5:
                        category = _a.sent();
                        if (!category) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(category_1.CategoryErrors.NOT_FOUND))];
                        }
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4, serviceRepository.findOne({
                                name: req.body.name,
                                worker: worker,
                            })];
                    case 6:
                        service = _a.sent();
                        if (service) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.ALREADY_EXISTS))];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    ServiceValidator.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, workerRepository, worker, categoryRepository, category, serviceRepository, service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string(),
                            description: Yup.string(),
                            minValue: Yup.number(),
                            categoryId: Yup.number(),
                        });
                        return [4, schema.isValid(req.body)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
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
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(validation))];
                    case 3:
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4, workerRepository.findOne({ id: req.userId })];
                    case 4:
                        worker = _a.sent();
                        if (!worker) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_A_WORKER))];
                        }
                        if (!req.body.categoryId)
                            return [3, 6];
                        categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
                        return [4, categoryRepository.findOne({
                                id: req.body.categoryId,
                            })];
                    case 5:
                        category = _a.sent();
                        if (!category) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(category_1.CategoryErrors.NOT_FOUND))];
                        }
                        _a.label = 6;
                    case 6:
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4, serviceRepository.findOne({
                                id: req.params.id,
                                worker: worker,
                            })];
                    case 7:
                        service = _a.sent();
                        if (!service) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_FOUND))];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    return ServiceValidator;
}());
exports.ServiceValidator = ServiceValidator;
//# sourceMappingURL=service.js.map