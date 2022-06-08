"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerRoutes = void 0;
var express_1 = require("express");
var workerController_1 = require("../controllers/workerController");
var worker_1 = require("../validators/worker");
var workerValidator = new worker_1.WorkerValidator();
var workerController = new workerController_1.WorkerController();
var router = (0, express_1.Router)();
router.post('/create', workerValidator.create, workerController.create);
exports.workerRoutes = router;
