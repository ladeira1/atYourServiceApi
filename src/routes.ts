import { Router } from 'express';
import { categoryRoutes } from './routes/category';
import { offerRoutes } from './routes/offer';
import { serviceRoutes } from './routes/service';
import { userRoutes } from './routes/user';
import { workerRoutes } from './routes/worker';

const router = Router();
router.use('/user', userRoutes);
router.use('/worker', workerRoutes);
router.use('/category', categoryRoutes);
router.use('/service', serviceRoutes);
router.use('/offer', offerRoutes);

export { router };
