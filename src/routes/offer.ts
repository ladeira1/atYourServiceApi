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
router.get('/:id', offerController.get);

router.post(
  '/create',
  authMiddleware,
  offerValidator.create,
  offerController.create,
);

router.delete(
  '/delete/:id',
  authMiddleware,
  offerValidator.delete,
  offerController.delete,
);

export const offerRoutes = router;
