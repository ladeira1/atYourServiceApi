import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/auth';
import { CategoryValidator } from '../validators/category';

const categoryValidator = new CategoryValidator();
const categoryController = new CategoryController();

const router = Router();
router.get('/list', categoryController.list);
router.get('/:id', categoryController.find);
router.post(
  '/create',
  categoryValidator.create,
  authMiddleware,
  categoryController.create,
);
router.patch(
  '/update/:id',
  categoryValidator.update,
  authMiddleware,
  categoryController.update,
);
router.delete(
  '/delete/:id',
  categoryValidator.delete,
  authMiddleware,
  categoryController.delete,
);

export const categoryRoutes = router;
