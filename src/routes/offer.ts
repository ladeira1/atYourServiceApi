import { Router } from 'express';
import { OfferController } from '../controllers/offerController';
import { authMiddleware } from '../middlewares/auth';
import { OfferValidator } from '../validators/offer';

const offerValidator = new OfferValidator();
const offerController = new OfferController();

const router = Router();

router.get(
  '/list',
  authMiddleware,
  offerValidator.list,
  offerController.listByWorker,
);

router.post(
  '/create',
  authMiddleware,
  offerValidator.create,
  offerController.create,
);

export const offerRoutes = router;
