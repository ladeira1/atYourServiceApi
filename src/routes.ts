import { Router } from 'express';
import { categoryRoutes } from './routes/category';
import { userRoutes } from './routes/user';
import { workerRoutes } from './routes/worker';

const router = Router();
router.use('/user', userRoutes);
router.use('/worker', workerRoutes);
router.use('/category', categoryRoutes);

export { router };
