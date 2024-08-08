import express from 'express';
import cors from 'cors';
import appRouter from './routes';
import path from 'path';

const createServer = () => {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(express.static(path.join(__dirname, './../../frontend')));

  app.use('/api', appRouter);

  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
};

export default createServer;
