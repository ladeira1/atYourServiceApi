"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerRoutes = void 0;
const express_1 = require("express");
const workerController_1 = require("../controllers/workerController");
const worker_1 = require("../validators/worker");
const workerValidator = new worker_1.WorkerValidator();
const workerController = new workerController_1.WorkerController();
const router = (0, express_1.Router)();
router.post('/create', workerValidator.create, workerController.create);
exports.workerRoutes = router;
//# sourceMappingURL=worker.js.map