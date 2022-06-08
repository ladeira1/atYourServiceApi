"use strict";
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
exports.OfferController = void 0;
var typeorm_1 = require("typeorm");
var OfferRepository_1 = require("../repositories/OfferRepository");
var ServiceRepository_1 = require("../repositories/ServiceRepository");
var UserRepository_1 = require("../repositories/UserRepository");
var WorkerRepository_1 = require("../repositories/WorkerRepository");
var Status_1 = require("../types/Status");
var offerView_1 = require("../views/offerView");
var OfferController = /** @class */ (function () {
    function OfferController() {
    }
    OfferController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, offerRepository, offer, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({ id: id })];
                    case 1:
                        offer = _a.sent();
                        if (!offer)
                            return [2 /*return*/, res.status(200).json([])];
                        return [2 /*return*/, res.status(200).json(offerView_1.OfferView.returnOffer(offer))];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(err_1))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OfferController.prototype.listByWorker = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, workerRepository, worker, serviceRepository, services, offers, offerRepository, i, serviceOffers, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userId = req.userId;
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4 /*yield*/, workerRepository.findOne({ id: userId })];
                    case 1:
                        worker = _a.sent();
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4 /*yield*/, serviceRepository.find({ where: { worker: worker } })];
                    case 2:
                        services = _a.sent();
                        offers = [];
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < (services === null || services === void 0 ? void 0 : services.length))) return [3 /*break*/, 6];
                        return [4 /*yield*/, offerRepository.find({
                                where: { service: services[i] },
                            })];
                    case 4:
                        serviceOffers = _a.sent();
                        if (serviceOffers && serviceOffers.length > 0) {
                            offers.push.apply(offers, serviceOffers);
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, res.status(200).json(offerView_1.OfferView.returnMany(offers))];
                    case 7:
                        err_2 = _a.sent();
                        res.status(401).json(offerView_1.OfferView.manyErrors(err_2));
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OfferController.prototype.listByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, userRepository, user, offerRepository, offers, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = req.userId;
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: userId })];
                    case 1:
                        user = _a.sent();
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.find({ user: user })];
                    case 2:
                        offers = _a.sent();
                        return [2 /*return*/, res.status(200).json(offerView_1.OfferView.returnMany(offers))];
                    case 3:
                        err_3 = _a.sent();
                        res.status(401).json(offerView_1.OfferView.manyErrors(err_3));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OfferController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, message, value, serviceId, userId, serviceRepository, service, userRepository, user, offerRepository, offer, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, title = _a.title, message = _a.message, value = _a.value, serviceId = _a.serviceId, userId = req.userId;
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4 /*yield*/, serviceRepository.findOne({ id: serviceId })];
                    case 1:
                        service = _b.sent();
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: userId })];
                    case 2:
                        user = _b.sent();
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        offer = offerRepository.create({
                            title: title,
                            message: message,
                            value: value,
                            status: Status_1.Status.PENDING,
                            service: service,
                            user: user,
                        });
                        return [4 /*yield*/, offerRepository.save(offer)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json(offerView_1.OfferView.returnOffer(offer))];
                    case 4:
                        err_4 = _b.sent();
                        res.status(401).json(offerView_1.OfferView.manyErrors(err_4));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OfferController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, offerRepository, offer, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({ id: id })];
                    case 1:
                        offer = _a.sent();
                        return [4 /*yield*/, offerRepository.remove(offer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(204).send()];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(err_5))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OfferController.prototype.complete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, thumbsUp, offerRepository, offer, serviceRepository, service, oldOffers, newThumbsUpCount, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        id = req.params.id, thumbsUp = req.body.thumbsUp;
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({ where: { id: id } })];
                    case 1:
                        offer = _a.sent();
                        offer.status = Status_1.Status.DONE;
                        offer.thumbsUp = thumbsUp;
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4 /*yield*/, serviceRepository.findOne({
                                where: { id: offer.service.id },
                            })];
                    case 2:
                        service = _a.sent();
                        service.timesProvided += 1;
                        return [4 /*yield*/, offerRepository.find({
                                where: { service: service, status: Status_1.Status.DONE },
                            })];
                    case 3:
                        oldOffers = _a.sent();
                        newThumbsUpCount = oldOffers.reduce(function (accumulator, item) {
                            var _a;
                            accumulator += (_a = Number(item === null || item === void 0 ? void 0 : item.thumbsUp)) !== null && _a !== void 0 ? _a : 0;
                            return Number(accumulator);
                        }, thumbsUp);
                        service.thumbsUp = newThumbsUpCount / service.timesProvided;
                        offer.service = service;
                        return [4 /*yield*/, serviceRepository.save(service)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, offerRepository.save(offer)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json(offerView_1.OfferView.returnOffer(offer))];
                    case 6:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(err_6))];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OfferController.prototype.acceptOrRefuse = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, status_1, offerRepository, offer, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id, status_1 = req.body.status;
                        offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
                        return [4 /*yield*/, offerRepository.findOne({ where: { id: id } })];
                    case 1:
                        offer = _a.sent();
                        offer.status = status_1;
                        return [4 /*yield*/, offerRepository.save(offer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json(offerView_1.OfferView.returnOffer(offer))];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, res.status(401).json(offerView_1.OfferView.manyErrors(err_7))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OfferController;
}());
exports.OfferController = OfferController;
