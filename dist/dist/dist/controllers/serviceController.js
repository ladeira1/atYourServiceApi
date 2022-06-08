"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
var typeorm_1 = require("typeorm");
var imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
var service_1 = require("../errors/service");
var CategoryRepository_1 = require("../repositories/CategoryRepository");
var ServiceRepository_1 = require("../repositories/ServiceRepository");
var WorkerRepository_1 = require("../repositories/WorkerRepository");
var serviceView_1 = require("../views/serviceView");
var workerController_1 = require("./workerController");
var ImageRepository_1 = require("../repositories/ImageRepository");
var ServiceController = (function () {
    function ServiceController() {
    }
    ServiceController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, category, name_1, workerId, serviceRepository, filter, workerRepository, worker, services, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.query, category = _a.category, name_1 = _a.name, workerId = _a.workerId;
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        filter = {};
                        if (category)
                            filter = __assign(__assign({}, filter), { category: category });
                        if (name_1)
                            filter = __assign(__assign({}, filter), { name: (0, typeorm_1.ILike)("%" + name_1 + "%") });
                        if (!workerId)
                            return [3, 2];
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4, workerRepository.findOne({ id: String(workerId) })];
                    case 1:
                        worker = _b.sent();
                        if (!worker)
                            return [2, res.status(200).json(serviceView_1.ServiceView.returnMany([]))];
                        filter = __assign(__assign({}, filter), { worker: worker });
                        _b.label = 2;
                    case 2: return [4, serviceRepository.find({
                            where: filter,
                        })];
                    case 3:
                        services = _b.sent();
                        return [2, res.status(200).json(serviceView_1.ServiceView.returnMany(services))];
                    case 4:
                        err_1 = _b.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(err_1))];
                    case 5: return [2];
                }
            });
        });
    };
    ServiceController.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, serviceRepository, service, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4, serviceRepository.findOne({ id: id })];
                    case 1:
                        service = _a.sent();
                        if (!service) {
                            return [2, res
                                    .status(422)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_FOUND))];
                        }
                        return [2, res.status(200).json(serviceView_1.ServiceView.returnService(service))];
                    case 2:
                        err_2 = _a.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(err_2))];
                    case 3: return [2];
                }
            });
        });
    };
    ServiceController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_2, minValue, categoryId, description, userId, files, workerController, worker, categoryRepository, category, serviceRepository, service, imageRepository, images, i, file, response, image, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        _a = req.body, name_2 = _a.name, minValue = _a.minValue, categoryId = _a.categoryId, description = _a.description, userId = req.userId, files = req.files;
                        workerController = new workerController_1.WorkerController();
                        return [4, workerController.find(userId)];
                    case 1:
                        worker = _b.sent();
                        categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
                        return [4, categoryRepository.findOne({ id: categoryId })];
                    case 2:
                        category = _b.sent();
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        service = serviceRepository.create({
                            name: name_2,
                            minValue: minValue,
                            category: category,
                            description: description,
                            timesProvided: 0,
                            thumbsUp: 0,
                            worker: worker,
                        });
                        imageRepository = (0, typeorm_1.getCustomRepository)(ImageRepository_1.ImageRepository);
                        images = [];
                        if (!(files && Array.isArray(files)))
                            return [3, 7];
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < files.length))
                            return [3, 7];
                        file = files[i];
                        return [4, (0, imgbb_uploader_1.default)(process.env.IMGBB_API_KEY, file.path)];
                    case 4:
                        response = _b.sent();
                        image = imageRepository.create({
                            url: response.url,
                            service: service,
                        });
                        return [4, imageRepository.save(image)];
                    case 5:
                        _b.sent();
                        images.push(image);
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3, 3];
                    case 7:
                        service.images = images;
                        return [4, serviceRepository.save(service)];
                    case 8:
                        _b.sent();
                        return [2, res.status(201).json(serviceView_1.ServiceView.returnService(service))];
                    case 9:
                        err_3 = _b.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(err_3))];
                    case 10: return [2];
                }
            });
        });
    };
    ServiceController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, id, workerRepository, worker, serviceRepository, service, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userId = req.userId, id = req.params.id;
                        workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                        return [4, workerRepository.findOne({
                                id: userId,
                            })];
                    case 1:
                        worker = _a.sent();
                        if (!worker) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.INVALID_WORKER))];
                        }
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4, serviceRepository.findOne({
                                id: id,
                                worker: worker,
                            })];
                    case 2:
                        service = _a.sent();
                        if (!service) {
                            return [2, res
                                    .status(401)
                                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_FOUND))];
                        }
                        return [4, serviceRepository.remove(service)];
                    case 3:
                        _a.sent();
                        return [2, res.status(204).send()];
                    case 4:
                        err_4 = _a.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(err_4))];
                    case 5: return [2];
                }
            });
        });
    };
    ServiceController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_3, minValue, categoryId, description, id, files, serviceRepository, service, categoryRepository, category, imageRepository, images, i, file, response, image, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        _a = req.body, name_3 = _a.name, minValue = _a.minValue, categoryId = _a.categoryId, description = _a.description, id = req.params.id, files = req.files;
                        serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
                        return [4, serviceRepository.findOne({ id: id })];
                    case 1:
                        service = _b.sent();
                        if (name_3)
                            service.name = name_3;
                        if (minValue)
                            service.minValue = minValue;
                        if (!categoryId)
                            return [3, 3];
                        categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
                        return [4, categoryRepository.findOne({ id: categoryId })];
                    case 2:
                        category = _b.sent();
                        service.category = category;
                        _b.label = 3;
                    case 3:
                        if (description)
                            service.description = description;
                        imageRepository = (0, typeorm_1.getCustomRepository)(ImageRepository_1.ImageRepository);
                        images = [];
                        if (!(files && Array.isArray(files)))
                            return [3, 8];
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < files.length))
                            return [3, 8];
                        file = files[i];
                        return [4, (0, imgbb_uploader_1.default)(process.env.IMGBB_API_KEY, file.path)];
                    case 5:
                        response = _b.sent();
                        image = imageRepository.create({
                            url: response.url,
                            service: service,
                        });
                        return [4, imageRepository.save(image)];
                    case 6:
                        _b.sent();
                        images.push(image);
                        _b.label = 7;
                    case 7:
                        i++;
                        return [3, 4];
                    case 8:
                        service.images = images;
                        return [4, serviceRepository.save(service)];
                    case 9:
                        _b.sent();
                        return [2, res.status(200).json(serviceView_1.ServiceView.returnService(service))];
                    case 10:
                        err_5 = _b.sent();
                        return [2, res.status(401).json(serviceView_1.ServiceView.manyErrors(err_5))];
                    case 11: return [2];
                }
            });
        });
    };
    return ServiceController;
}());
exports.ServiceController = ServiceController;
//# sourceMappingURL=serviceController.js.map