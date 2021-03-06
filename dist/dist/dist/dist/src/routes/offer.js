"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRoutes = void 0;
const express_1 = require("express");
const offerController_1 = require("../controllers/offerController");
const auth_1 = require("../middlewares/auth");
const offer_1 = require("../validators/offer");
const offerValidator = new offer_1.OfferValidator();
const offerController = new offerController_1.OfferController();
const router = (0, express_1.Router)();
router.get('/list', auth_1.authMiddleware, offerValidator.list, offerController.listByWorker);
router.get('/list/user', auth_1.authMiddleware, offerValidator.listByUser, offerController.listByUser);
router.get('/:id', offerController.get);
router.post('/create', auth_1.authMiddleware, offerValidator.create, offerController.create);
router.patch('/accept_or_refuse/:id', auth_1.authMiddleware, offerValidator.createOrDelete, offerController.acceptOrRefuse);
router.patch('/complete/:id', auth_1.authMiddleware, offerValidator.complete, offerController.complete);
router.delete('/delete/:id', auth_1.authMiddleware, offerValidator.delete, offerController.delete);
exports.offerRoutes = router;
//# sourceMappingURL=offer.js.map