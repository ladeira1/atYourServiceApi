import { Router } from 'express';
import { ServiceController } from '../controllers/serviceController';
import { authMiddleware } from '../middlewares/auth';
import { ServiceValidator } from '../validators/service';

const serviceValidator = new ServiceValidator();
const serviceController = new ServiceController();

const router = Router();
router.get('/list', serviceController.list);
router.get('/:id', serviceController.find);
router.post(
  '/create',
  authMiddleware,
  serviceValidator.create,
  serviceController.create,
);
router.patch(
  '/update/:id',
  authMiddleware,
  serviceValidator.update,
  serviceController.update,
);
router.delete('/delete/:id', authMiddleware, serviceController.delete);

export const serviceRoutes = router;
