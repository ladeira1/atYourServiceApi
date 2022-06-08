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
exports.OfferValidator = void 0;
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const offer_1 = require("../errors/offer");
const service_1 = require("../errors/service");
const user_1 = require("../errors/user");
const worker_1 = require("../errors/worker");
const OfferRepository_1 = require("../repositories/OfferRepository");
const ServiceRepository_1 = require("../repositories/ServiceRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const Status_1 = require("../types/Status");
const offerView_1 = require("../views/offerView");
class OfferValidator {
    async list(req, res, next) {
        const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
        const worker = await workerRepository.findOne({ id: req.userId });
        if (!worker) {
            return res.status(404).json(offerView_1.OfferView.manyErrors(worker_1.WorkerErrors.NOT_FOUND));
        }
        next();
    }
    async listByUser(req, res, next) {
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ id: req.userId });
        if (!user) {
            return res
                .status(404)
                .json(offerView_1.OfferView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND));
        }
        next();
    }
    async create(req, res, next) {
        const schema = Yup.object().shape({
            title: Yup.string().required(offer_1.OfferErrors.REQUIRED_TITLE),
            message: Yup.string().required(offer_1.OfferErrors.REQUIRED_MESSAGE),
            value: Yup.number().required(offer_1.OfferErrors.REQUIRED_VALUE),
            serviceId: Yup.number().required(offer_1.OfferErrors.REQUIRED_SERVICE),
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
            return res.status(401).json(offerView_1.OfferView.manyErrors(validation));
        }
        const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
        const worker = await workerRepository.findOne({ id: req.userId });
        const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
        const service = await serviceRepository.findOne({
            id: req.body.serviceId,
        });
        if (!service) {
            return res
                .status(404)
                .json(offerView_1.OfferView.manyErrors(service_1.ServiceErrors.NOT_FOUND));
        }
        if (worker?.id === service.worker?.id) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CANT_MAKE_AN_OFFER_FOR_YOUR_SERVICE));
        }
        if (service.minValue > Number(req.body.value)) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.VALUE_MUST_BE_HIGHER_THAN_SERVICE_MIN_VALUE));
        }
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ id: req.userId });
        const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
        const offer = await offerRepository.findOne({
            service,
            user,
        });
        if (offer && offer.status !== Status_1.Status.DONE) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.ALREADY_EXISTS_FOR_THIS_USER_AND_SERVICE));
        }
        next();
    }
    async delete(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.number().required(offer_1.OfferErrors.NOT_FOUND),
        });
        if (!(await schema.isValid(req.params))) {
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
            return res.status(401).json(offerView_1.OfferView.manyErrors(validation));
        }
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ id: req.userId });
        const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
        const offer = await offerRepository.findOne({
            id: req.params.id,
        });
        if (!offer || offer?.user.id !== user.id) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CAN_ONLY_DELETE_YOUR_OWN_OFFER));
        }
        next();
    }
    async createOrDelete(req, res, next) {
        const schema = Yup.object().shape({
            status: Yup.string()
                .oneOf([Status_1.Status.FINISHED, Status_1.Status.PENDING, Status_1.Status.CANCELLED])
                .required(offer_1.OfferErrors.REQUIRED_STATUS),
            id: Yup.number().required(offer_1.OfferErrors.NOT_FOUND),
        });
        if (!(await schema.isValid({ ...req.body, ...req.params }))) {
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
            return res.status(401).json(offerView_1.OfferView.manyErrors(validation));
        }
        const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
        const offer = await offerRepository.findOne({
            id: req.params.id,
        });
        if (!offer || offer?.service.worker.id !== req.userId) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CAN_ONLY_UPDATE_YOUR_OWN_OFFER));
        }
        next();
    }
    async complete(req, res, next) {
        const schema = Yup.object().shape({
            thumbsUp: Yup.number()
                .min(1)
                .max(5)
                .required(offer_1.OfferErrors.INVALID_THUMBS_UP),
            id: Yup.number().required(offer_1.OfferErrors.NOT_FOUND),
        });
        if (!(await schema.isValid({ ...req.body, ...req.params }))) {
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
            return res.status(401).json(offerView_1.OfferView.manyErrors(validation));
        }
        const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
        const offer = await offerRepository.findOne({
            id: req.params.id,
        });
        if (!offer || offer?.user.id !== req.userId) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CAN_ONLY_UPDATE_YOUR_OWN_OFFER));
        }
        if (offer.status !== Status_1.Status.FINISHED) {
            return res
                .status(401)
                .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.STATUS_MUST_BE_FINISHED));
        }
        next();
    }
}
exports.OfferValidator = OfferValidator;
//# sourceMappingURL=offer.js.map