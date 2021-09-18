import { Router } from 'express';
import { userRoutes } from './routes/user';
import { workerRoutes } from './routes/worker';

const router = Router();
router.use('/user', userRoutes);
router.use('/worker', workerRoutes);

export { router };
