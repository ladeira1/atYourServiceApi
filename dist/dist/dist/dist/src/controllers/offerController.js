"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const typeorm_1 = require("typeorm");
const OfferRepository_1 = require("../repositories/OfferRepository");
const ServiceRepository_1 = require("../repositories/ServiceRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const WorkerRepository_1 = require("../repositories/WorkerRepository");
const Status_1 = require("../types/Status");
const offerView_1 = require("../views/offerView");
class OfferController {
    async get(req, res) {
        try {
            const { id } = req.params;
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            const offer = await offerRepository.findOne({ id });
            if (!offer)
                return res.status(200).json([]);
            return res.status(200).json(offerView_1.OfferView.returnOffer(offer));
        }
        catch (err) {
            return res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
    async listByWorker(req, res) {
        try {
            const { userId } = req;
            const workerRepository = (0, typeorm_1.getCustomRepository)(WorkerRepository_1.WorkerRepository);
            const worker = await workerRepository.findOne({ id: userId });
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const services = await serviceRepository.find({ where: { worker } });
            const offers = [];
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            for (let i = 0; i < services?.length; i++) {
                const serviceOffers = await offerRepository.find({
                    where: { service: services[i] },
                });
                if (serviceOffers && serviceOffers.length > 0) {
                    offers.push(...serviceOffers);
                }
            }
            return res.status(200).json(offerView_1.OfferView.returnMany(offers));
        }
        catch (err) {
            res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
    async listByUser(req, res) {
        try {
            const { userId } = req;
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({ id: userId });
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            const offers = await offerRepository.find({ user });
            return res.status(200).json(offerView_1.OfferView.returnMany(offers));
        }
        catch (err) {
            res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
    async create(req, res) {
        try {
            const { body: { title, message, value, serviceId }, userId, } = req;
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const service = await serviceRepository.findOne({ id: serviceId });
            const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
            const user = await userRepository.findOne({ id: userId });
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            const offer = offerRepository.create({
                title,
                message,
                value,
                status: Status_1.Status.PENDING,
                service,
                user,
            });
            await offerRepository.save(offer);
            return res.status(201).json(offerView_1.OfferView.returnOffer(offer));
        }
        catch (err) {
            res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            const offer = await offerRepository.findOne({ id });
            await offerRepository.remove(offer);
            return res.status(204).send();
        }
        catch (err) {
            return res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
    async complete(req, res) {
        try {
            const { params: { id }, body: { thumbsUp }, } = req;
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            const offer = await offerRepository.findOne({ where: { id } });
            offer.status = Status_1.Status.DONE;
            offer.thumbsUp = thumbsUp;
            const serviceRepository = (0, typeorm_1.getCustomRepository)(ServiceRepository_1.ServiceRepository);
            const service = await serviceRepository.findOne({
                where: { id: offer.service.id },
            });
            service.timesProvided += 1;
            const oldOffers = await offerRepository.find({
                where: { service, status: Status_1.Status.DONE },
            });
            const newThumbsUpCount = oldOffers.reduce((accumulator, item) => {
                accumulator += Number(item?.thumbsUp) ?? 0;
                return Number(accumulator);
            }, thumbsUp);
            service.thumbsUp = newThumbsUpCount / service.timesProvided;
            offer.service = service;
            await serviceRepository.save(service);
            await offerRepository.save(offer);
            return res.status(200).json(offerView_1.OfferView.returnOffer(offer));
        }
        catch (err) {
            return res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
    async acceptOrRefuse(req, res) {
        try {
            const { params: { id }, body: { status }, } = req;
            const offerRepository = (0, typeorm_1.getCustomRepository)(OfferRepository_1.OfferRepository);
            const offer = await offerRepository.findOne({ where: { id } });
            offer.status = status;
            await offerRepository.save(offer);
            return res.status(200).json(offerView_1.OfferView.returnOffer(offer));
        }
        catch (err) {
            return res.status(401).json(offerView_1.OfferView.manyErrors(err));
        }
    }
}
exports.OfferController = OfferController;
//# sourceMappingURL=offerController.js.map