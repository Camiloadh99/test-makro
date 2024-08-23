import express from 'express';
import cors from 'cors';
import appRouter from './routes';
import path from 'path';
import { buildOpenApiMiddelware } from '@fnd/libs/open-api';
import { swaggerDocument, swaggerUi } from '@fnd/libs/swagger-ui';

const createServer = () => {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use('/spec', express.static('./oas3.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(buildOpenApiMiddelware());

  app.use(express.static(path.join(__dirname, './../../frontend')));

  app.use('/api', appRouter);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default createServer;
