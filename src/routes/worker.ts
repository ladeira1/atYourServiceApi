import { Router } from 'express';
import { WorkerController } from '../controllers/workerController';
import { WorkerValidator } from '../validators/worker';

const workerValidator = new WorkerValidator();
const workerController = new WorkerController();

const router = Router();
router.post('/create', workerValidator.create, workerController.create);

export const workerRoutes = router;
