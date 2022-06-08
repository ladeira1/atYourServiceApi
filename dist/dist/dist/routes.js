"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var category_1 = require("./routes/category");
var offer_1 = require("./routes/offer");
var service_1 = require("./routes/service");
var user_1 = require("./routes/user");
var worker_1 = require("./routes/worker");
var router = (0, express_1.Router)();
exports.router = router;
router.use('/user', user_1.userRoutes);
router.use('/worker', worker_1.workerRoutes);
router.use('/category', category_1.categoryRoutes);
router.use('/service', service_1.serviceRoutes);
router.use('/offer', offer_1.offerRoutes);
//# sourceMappingURL=routes.js.map