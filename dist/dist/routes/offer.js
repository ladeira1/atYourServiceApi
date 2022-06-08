"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRoutes = void 0;
var express_1 = require("express");
var offerController_1 = require("../controllers/offerController");
var auth_1 = require("../middlewares/auth");
var offer_1 = require("../validators/offer");
var offerValidator = new offer_1.OfferValidator();
var offerController = new offerController_1.OfferController();
var router = (0, express_1.Router)();
router.get('/list', auth_1.authMiddleware, offerValidator.list, offerController.listByWorker);
router.get('/list/user', auth_1.authMiddleware, offerValidator.listByUser, offerController.listByUser);
router.get('/:id', offerController.get);
router.post('/create', auth_1.authMiddleware, offerValidator.create, offerController.create);
router.patch('/accept_or_refuse/:id', auth_1.authMiddleware, offerValidator.createOrDelete, offerController.acceptOrRefuse);
router.patch('/complete/:id', auth_1.authMiddleware, offerValidator.complete, offerController.complete);
router.delete('/delete/:id', auth_1.authMiddleware, offerValidator.delete, offerController.delete);
exports.offerRoutes = router;
//# sourceMappingURL=offer.js.map