import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserValidator } from '../validations/user';

const userValidator = new UserValidator();
const userController = new UserController();

const router = Router();
router.post('/create', userValidator.createAccount, userController.create);
router.post('/login', userValidator.login, userController.login);

export const userRoutes = router;
