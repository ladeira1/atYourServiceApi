"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
var express_1 = require("express");
var categoryController_1 = require("../controllers/categoryController");
var auth_1 = require("../middlewares/auth");
var category_1 = require("../validators/category");
var categoryValidator = new category_1.CategoryValidator();
var categoryController = new categoryController_1.CategoryController();
var router = (0, express_1.Router)();
router.get('/list', categoryController.list);
router.get('/:id', categoryController.find);
router.post('/create', categoryValidator.create, auth_1.authMiddleware, categoryController.create);
router.patch('/update/:id', categoryValidator.update, auth_1.authMiddleware, categoryController.update);
router.delete('/delete/:id', categoryValidator.delete, auth_1.authMiddleware, categoryController.delete);
exports.categoryRoutes = router;
