import { Router } from 'express';
import { WorkerValidator } from '../validations/worker';

const workerValidator = new WorkerValidator();

const router = Router();
router.post('/create/worker', workerValidator.create);

export const userRoutes = router;
