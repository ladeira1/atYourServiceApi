import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';
import { UserValidator } from '../validations/user';

const userValidator = new UserValidator();
const userController = new UserController();

const router = Router();
router.post('/create', userValidator.createAccount, userController.create);
router.post('/login', userValidator.login, userController.login);
router.delete('/', authMiddleware, userController.delete);
router.patch(
  '/name',
  userValidator.update,
  authMiddleware,
  userController.update,
);
router.patch(
  '/password/update',
  userValidator.updatePassword,
  authMiddleware,
  userController.updatePassword,
);

export const userRoutes = router;
