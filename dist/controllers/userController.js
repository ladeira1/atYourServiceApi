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
exports.UserController = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("../errors/user");
var UserRepository_1 = require("../repositories/UserRepository");
var WorkerRepository_1 = require("../repositories/WorkerRepository");
var userView_1 = require("../views/userView");
var workerView_1 = require("../views/workerView");
var workerController_1 = require("./workerController");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.get = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, workerController, worker, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({
                                where: { id: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id },
                            })];
                    case 1:
                        user = _b.sent();
                        workerController = new workerController_1.WorkerController();
                        return [4 /*yield*/, workerController.find(user.id)];
                    case 2:
                        worker = _b.sent();
                        if (worker) {
                            worker.user = user;
                            return [2 /*return*/, res.status(200).json(workerView_1.WorkerView.returnWorker(worker))];
                        }
                        return [2 /*return*/, res.status(200).json(userView_1.UserView.returnUser(user, false))];
                    case 3:
                        err_1 = _b.sent();
                        res.status(401).json(userView_1.UserView.manyErrors(err_1.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, email, city, password, phone, userRepository, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, email = _a.email, city = _a.city, password = _a.password, phone = _a.phone;
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        user = userRepository.create({
                            name: name_1,
                            email: email,
                            phone: phone,
                            city: city,
                        });
                        user.hashPassword(password);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 1:
                        _b.sent();
                        res.status(201).json(userView_1.UserView.returnUser(user));
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        res.status(401).json(userView_1.UserView.manyErrors(err_2));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, userRepository, user, workerController, worker, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({
                                where: { email: email },
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user.validatePassword(password)) {
                            throw new Error(user_1.UserErrors.INVALID_PASSWORD);
                        }
                        workerController = new workerController_1.WorkerController();
                        return [4 /*yield*/, workerController.find(user.id)];
                    case 2:
                        worker = _b.sent();
                        if (worker) {
                            worker.user = user;
                            return [2 /*return*/, res.status(200).json(workerView_1.WorkerView.returnWorker(worker))];
                        }
                        return [2 /*return*/, res.status(200).json(userView_1.UserView.returnUser(user))];
                    case 3:
                        err_3 = _b.sent();
                        res.status(401).json(userView_1.UserView.manyErrors(err_3.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, userRepository, workerRepository, workerController, worker, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userId = req.userId;
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        workerController = new workerController_1.WorkerController();
                        return [4 /*yield*/, workerController.find(userId)];
                    case 1:
                        worker = _a.sent();
                        if (!worker) return [3 /*break*/, 3];
                        return [4 /*yield*/, workerRepository.remove(worker)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, userRepository.findOne({ id: userId })];
                    case 4:
                        user = _a.sent();
                        return [4 /*yield*/, userRepository.remove(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(204).send()];
                    case 6:
                        err_4 = _a.sent();
                        res.status(401).json(userView_1.UserView.manyErrors(err_4.message));
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, name_2, userRepository, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = req.userId, name_2 = req.body.name;
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: userId })];
                    case 1:
                        user = _a.sent();
                        user.name = name_2;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json(userView_1.UserView.returnUser(user))];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json(userView_1.UserView.manyErrors(err_5.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updatePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, oldPassword, password, userRepository, user, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.userId, _a = req.body, oldPassword = _a.oldPassword, password = _a.password;
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findOne({ id: userId })];
                    case 1:
                        user = _b.sent();
                        if (!user.validatePassword(oldPassword)) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.WRONG_PASSWORD))];
                        }
                        user.hashPassword(password);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(204).send()];
                    case 3:
                        err_6 = _b.sent();
                        return [2 /*return*/, res.status(400).json(userView_1.UserView.manyErrors(err_6.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
