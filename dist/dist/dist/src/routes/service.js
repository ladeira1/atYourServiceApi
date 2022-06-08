"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = require("../config/upload");
const serviceController_1 = require("../controllers/serviceController");
const auth_1 = require("../middlewares/auth");
const service_1 = require("../validators/service");
const upload = (0, multer_1.default)(upload_1.uploadConfig);
const serviceValidator = new service_1.ServiceValidator();
const serviceController = new serviceController_1.ServiceController();
const router = (0, express_1.Router)();
router.get('/list', serviceController.list);
router.get('/:id', serviceController.find);
router.post('/create', auth_1.authMiddleware, upload.array('images'), serviceValidator.create, serviceController.create);
router.patch('/update/:id', auth_1.authMiddleware, upload.array('images'), serviceValidator.update, serviceController.update);
router.delete('/delete/:id', auth_1.authMiddleware, serviceController.delete);
exports.serviceRoutes = router;
//# sourceMappingURL=service.js.map