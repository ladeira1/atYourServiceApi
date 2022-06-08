"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var auth_1 = require("../middlewares/auth");
var user_1 = require("../validators/user");
var userValidator = new user_1.UserValidator();
var userController = new userController_1.UserController();
var router = (0, express_1.Router)();
router.get('/:id', userValidator.get, userController.get);
router.post('/create', userValidator.createAccount, userController.create);
router.post('/login', userValidator.login, userController.login);
router.delete('/', auth_1.authMiddleware, userController.delete);
router.patch('/name', userValidator.update, auth_1.authMiddleware, userController.update);
router.patch('/password/update', userValidator.updatePassword, auth_1.authMiddleware, userController.updatePassword);
exports.userRoutes = router;
//# sourceMappingURL=user.js.map