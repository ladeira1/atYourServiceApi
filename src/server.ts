import express from 'express';
import './database';
import cors from 'cors';
import { router } from './routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
