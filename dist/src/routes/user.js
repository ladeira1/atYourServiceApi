"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const user_1 = require("../validators/user");
const userValidator = new user_1.UserValidator();
const userController = new userController_1.UserController();
const router = (0, express_1.Router)();
router.get('/:id', userValidator.get, userController.get);
router.post('/create', userValidator.createAccount, userController.create);
router.post('/login', userValidator.login, userController.login);
router.delete('/', auth_1.authMiddleware, userController.delete);
router.patch('/name', userValidator.update, auth_1.authMiddleware, userController.update);
router.patch('/password/update', userValidator.updatePassword, auth_1.authMiddleware, userController.updatePassword);
exports.userRoutes = router;
//# sourceMappingURL=user.js.map