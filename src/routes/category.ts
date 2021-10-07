import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/auth';
import { CategoryValidator } from '../validators/category';

const categoryValidator = new CategoryValidator();
const categoryController = new CategoryController();

const router = Router();
router.get('/:id', categoryController.find);
router.get('/', categoryController.list);
router.post(
  '/create',
  categoryValidator.create,
  authMiddleware,
  categoryController.create,
);

export const categoryRoutes = router;
