import express from 'express';
import cors from 'cors';
import appRouter from './routes';
import { env } from '@fnd/libs/env/env';

const createServer = () => {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use('/api', appRouter);

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
};

export default createServer;
