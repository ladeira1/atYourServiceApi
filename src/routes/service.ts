import { Router } from 'express';
import { ServiceController } from '../controllers/serviceController';
import { authMiddleware } from '../middlewares/auth';
import { ServiceValidator } from '../validators/service';

const serviceValidator = new ServiceValidator();
const serviceController = new ServiceController();

const router = Router();
router.post(
  '/create',
  authMiddleware,
  serviceValidator.create,
  serviceController.create,
);

export const serviceRoutes = router;
