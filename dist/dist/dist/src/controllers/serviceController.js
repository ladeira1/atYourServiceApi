"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const typeorm_1 = require("typeorm");
const imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
const service_1 = require("../errors/service");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const ServiceRepository_1 = require("../repositories/ServiceRepository");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const serviceView_1 = require("../views/serviceView");
const workerController_1 = require("./workerController");
const ImageRepository_1 = require("../repositories/ImageRepository");
class ServiceController {
    async list(req, res) {
        try {
            const { category, name, workerId } = req.query;
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            let filter = {};
            if (category)
                filter = { ...filter, category };
            if (name)
                filter = { ...filter, name: (0, typeorm_1.ILike)(`%${name}%`) };
            if (workerId) {
                const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
                const worker = await workerRepository.findOne({ id: String(workerId) });
                if (!worker)
                    return res.status(200).json(serviceView_1.ServiceView.returnMany([]));
                filter = { ...filter, worker };
            }
            const services = await serviceRepository.find({
                where: filter,
            });
            return res.status(200).json(serviceView_1.ServiceView.returnMany(services));
        }
        catch (err) {
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(err));
        }
    }
    async find(req, res) {
        try {
            const { id } = req.params;
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const service = await serviceRepository.findOne({ id });
            if (!service) {
                return res
                    .status(422)
                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_FOUND));
            }
            return res.status(200).json(serviceView_1.ServiceView.returnService(service));
        }
        catch (err) {
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(err));
        }
    }
    async create(req, res) {
        try {
            const { body: { name, minValue, categoryId, description }, userId, files, } = req;
            const workerController = new workerController_1.WorkerController();
            const worker = await workerController.find(userId);
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = await categoryRepository.findOne({ id: categoryId });
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const service = serviceRepository.create({
                name,
                minValue,
                category,
                description,
                timesProvided: 0,
                thumbsUp: 0,
                worker,
            });
            const imageRepository = (0, typeorm_1.getCustomRepository)(ImageRepository_1.ImageRepository);
            const images = [];
            if (files && Array.isArray(files)) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const response = await (0, imgbb_uploader_1.default)(process.env.IMGBB_API_KEY, file.path);
                    const image = imageRepository.create({
                        url: response.url,
                        service,
                    });
                    await imageRepository.save(image);
                    images.push(image);
                }
            }
            service.images = images;
            await serviceRepository.save(service);
            return res.status(201).json(serviceView_1.ServiceView.returnService(service));
        }
        catch (err) {
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(err));
        }
    }
    async delete(req, res) {
        try {
            const { userId, params: { id }, } = req;
            const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
            const worker = await workerRepository.findOne({
                id: userId,
            });
            if (!worker) {
                return res
                    .status(401)
                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.INVALID_WORKER));
            }
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const service = await serviceRepository.findOne({
                id,
                worker,
            });
            if (!service) {
                return res
                    .status(401)
                    .json(serviceView_1.ServiceView.manyErrors(service_1.ServiceErrors.NOT_FOUND));
            }
            await serviceRepository.remove(service);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(err));
        }
    }
    async update(req, res) {
        try {
            const { body: { name, minValue, categoryId, description }, params: { id }, files, } = req;
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const service = await serviceRepository.findOne({ id });
            if (name)
                service.name = name;
            if (minValue)
                service.minValue = minValue;
            if (categoryId) {
                const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
                const category = await categoryRepository.findOne({ id: categoryId });
                service.category = category;
            }
            if (description)
                service.description = description;
            const imageRepository = (0, typeorm_1.getCustomRepository)(ImageRepository_1.ImageRepository);
            const images = [];
            if (files && Array.isArray(files)) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const response = await (0, imgbb_uploader_1.default)(process.env.IMGBB_API_KEY, file.path);
                    const image = imageRepository.create({
                        url: response.url,
                        service,
                    });
                    await imageRepository.save(image);
                    images.push(image);
                }
            }
            service.images = images;
            await serviceRepository.save(service);
            return res.status(200).json(serviceView_1.ServiceView.returnService(service));
        }
        catch (err) {
            return res.status(401).json(serviceView_1.ServiceView.manyErrors(err));
        }
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=serviceController.js.map