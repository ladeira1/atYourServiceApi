import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/auth';
import { CategoryValidator } from '../validators/category';

const categoryValidator = new CategoryValidator();
const categoryController = new CategoryController();

const router = Router();
router.post(
  '/create',
  categoryValidator.create,
  authMiddleware,
  categoryController.create,
);

export const categoryRoutes = router;
