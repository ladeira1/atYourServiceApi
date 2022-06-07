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
router.get(
  '/list/user',
  authMiddleware,
  offerValidator.listByUser,
  offerController.listByUser,
);
router.get('/:id', offerController.get);

router.post(
  '/create',
  authMiddleware,
  offerValidator.create,
  offerController.create,
);

router.patch(
  '/accept_or_refuse/:id',
  authMiddleware,
  offerValidator.createOrDelete,
  offerController.acceptOrRefuse,
);

router.patch(
  '/complete/:id',
  authMiddleware,
  offerValidator.complete,
  offerController.complete,
);

router.delete(
  '/delete/:id',
  authMiddleware,
  offerValidator.delete,
  offerController.delete,
);

export const offerRoutes = router;
