"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const category_1 = require("./routes/category");
const offer_1 = require("./routes/offer");
const service_1 = require("./routes/service");
const user_1 = require("./routes/user");
const worker_1 = require("./routes/worker");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/user', user_1.userRoutes);
router.use('/worker', worker_1.workerRoutes);
router.use('/category', category_1.categoryRoutes);
router.use('/service', service_1.serviceRoutes);
router.use('/offer', offer_1.offerRoutes);
//# sourceMappingURL=routes.js.map