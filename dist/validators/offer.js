"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferValidator = void 0;
var typeorm_1 = require("typeorm");
var Yup = __importStar(require("yup"));
var offer_1 = require("../errors/offer");
var service_1 = require("../errors/service");
var user_1 = require("../errors/user");
var worker_1 = require("../errors/worker");
var OfferRepository_1 = require("../repositories/OfferRepository");
var ServiceRepository_1 = require("../repositories/ServiceRepository");
var UserRepository_1 = require("../repositories/UserRepository");
var WorkerRepository_1 = require("../repositories/WorkerRepository");
var Status_1 = require("../types/Status");
var offerView_1 = require("../views/offerView");
var OfferValidator = /** @class */ (function () {
    function OfferValidator() {
    }
    OfferValidator.prototype.list = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var workerRepository, worker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4 /*yield*/, workerRepository.findOne({ id: req.userId })];
                    case 1:
                        worker = _a.sent();
                        if (!worker) {
                            return [2 /*return*/, res.status(404).json(offerView_1.OfferView.manyErrors(worker_1.WorkerErrors.NOT_FOUND))];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferValidator.prototype.listByUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: req.userId })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json(offerView_1.OfferView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND))];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferValidator.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, workerRepository, worker, serviceRepository, service, userRepository, user, offerRepository, offer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = Yup.object().shape({
                            title: Yup.string().required(offer_1.OfferErrors.REQUIRED_TITLE),
                            message: Yup.string().required(offer_1.OfferErrors.REQUIRED_MESSAGE),
                            value: Yup.number().required(offer_1.OfferErrors.REQUIRED_VALUE),
                            serviceId: Yup.number().required(offer_1.OfferErrors.REQUIRED_SERVICE),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!!(_b.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, schema
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
                        validation = _b.sent();
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(validation))];
                    case 3:
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4 /*yield*/, workerRepository.findOne({ id: req.userId })];
                    case 4:
                        worker = _b.sent();
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4 /*yield*/, serviceRepository.findOne({
                                id: req.body.serviceId,
                            })];
                    case 5:
                        service = _b.sent();
                        if (!service) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json(offerView_1.OfferView.manyErrors(service_1.ServiceErrors.NOT_FOUND))];
                        }
                        if ((worker === null || worker === void 0 ? void 0 : worker.id) === ((_a = service.worker) === null || _a === void 0 ? void 0 : _a.id)) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CANT_MAKE_AN_OFFER_FOR_YOUR_SERVICE))];
                        }
                        if (service.minValue > Number(req.body.value)) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.VALUE_MUST_BE_HIGHER_THAN_SERVICE_MIN_VALUE))];
                        }
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: req.userId })];
                    case 6:
                        user = _b.sent();
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({
                                service: service,
                                user: user,
                            })];
                    case 7:
                        offer = _b.sent();
                        if (offer && offer.status !== Status_1.Status.DONE) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.ALREADY_EXISTS_FOR_THIS_USER_AND_SERVICE))];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferValidator.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, userRepository, user, offerRepository, offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            id: Yup.number().required(offer_1.OfferErrors.NOT_FOUND),
                        });
                        return [4 /*yield*/, schema.isValid(req.params)];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, schema
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
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(validation))];
                    case 3:
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: req.userId })];
                    case 4:
                        user = _a.sent();
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({
                                id: req.params.id,
                            })];
                    case 5:
                        offer = _a.sent();
                        if (!offer || (offer === null || offer === void 0 ? void 0 : offer.user.id) !== user.id) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CAN_ONLY_DELETE_YOUR_OWN_OFFER))];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferValidator.prototype.createOrDelete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, offerRepository, offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            status: Yup.string()
                                .oneOf([Status_1.Status.FINISHED, Status_1.Status.PENDING, Status_1.Status.CANCELLED])
                                .required(offer_1.OfferErrors.REQUIRED_STATUS),
                            id: Yup.number().required(offer_1.OfferErrors.NOT_FOUND),
                        });
                        return [4 /*yield*/, schema.isValid(__assign(__assign({}, req.body), req.params))];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, schema
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
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(validation))];
                    case 3:
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({
                                id: req.params.id,
                            })];
                    case 4:
                        offer = _a.sent();
                        if (!offer || (offer === null || offer === void 0 ? void 0 : offer.service.worker.id) !== req.userId) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CAN_ONLY_UPDATE_YOUR_OWN_OFFER))];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    OfferValidator.prototype.complete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, offerRepository, offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            thumbsUp: Yup.number()
                                .min(1)
                                .max(5)
                                .required(offer_1.OfferErrors.INVALID_THUMBS_UP),
                            id: Yup.number().required(offer_1.OfferErrors.NOT_FOUND),
                        });
                        return [4 /*yield*/, schema.isValid(__assign(__assign({}, req.body), req.params))];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, schema
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
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(validation))];
                    case 3:
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({
                                id: req.params.id,
                            })];
                    case 4:
                        offer = _a.sent();
                        if (!offer || (offer === null || offer === void 0 ? void 0 : offer.user.id) !== req.userId) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.YOU_CAN_ONLY_UPDATE_YOUR_OWN_OFFER))];
                        }
                        if (offer.status !== Status_1.Status.FINISHED) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(offerView_1.OfferView.manyErrors(offer_1.OfferErrors.STATUS_MUST_BE_FINISHED))];
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OfferValidator;
}());
exports.OfferValidator = OfferValidator;
