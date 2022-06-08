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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidator = void 0;
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const category_1 = require("../errors/category");
const service_1 = require("../errors/service");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const ServiceRepository_1 = require("../repositories/ServiceRepository");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const serviceView_1 = require("../views/serviceView");
class ServiceValidator {
    async create(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(service_1.ServiceErrors.REQUIRED_NAME),
            minValue: Yup.number().required(service_1.ServiceErrors.REQUIRED_MIN_VALUE),
            categoryId: Yup.number().required(service_1.ServiceErrors.REQUIRED_CATEGORY_ID),
            description: Yup.string().required(service_1.ServiceErrors.REQUIRED_DESCRIPTION),
        });
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
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(validation));
        }
        const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
        const worker = await workerRepository.findOne({ id: req.userId });
        if (!worker) {
            return res
                .status(401)
                .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_A_WORKER));
        }
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.findOne({
            id: req.body.categoryId,
        });
        if (!category) {
            return res
                .status(401)
                .json(serviceView_1.ServiceView.manyErrors(category_1.CategoryErrors.NOT_FOUND));
        }
        const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
        const service = await serviceRepository.findOne({
            name: req.body.name,
            worker,
        });
        if (service) {
            return res
                .status(401)
                .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.ALREADY_EXISTS));
        }
        next();
    }
    async update(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            description: Yup.string(),
            minValue: Yup.number(),
            categoryId: Yup.number(),
        });
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
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(validation));
        }
        const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
        const worker = await workerRepository.findOne({ id: req.userId });
        if (!worker) {
            return res
                .status(401)
                .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_A_WORKER));
        }
        if (req.body.categoryId) {
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = await categoryRepository.findOne({
                id: req.body.categoryId,
            });
            if (!category) {
                return res
                    .status(401)
                    .json(serviceView_1.ServiceView.manyErrors(category_1.CategoryErrors.NOT_FOUND));
            }
        }
        const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
        const service = await serviceRepository.findOne({
            id: req.params.id,
            worker,
        });
        if (!service) {
            return res
                .status(401)
                .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_FOUND));
        }
        next();
    }
}
exports.ServiceValidator = ServiceValidator;
//# sourceMappingURL=service.js.map