import express, { Router } from 'express';
import './database';
import cors from 'cors';
import { userRoutes } from './routes/user';

export const app = express();

app.use(cors());
app.use(express.json());

const router = Router();
router.use('/user', userRoutes);

app.use(router);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
