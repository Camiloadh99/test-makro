import loadenv, { env } from '@fnd/libs/env/env';
import createServer from './infrastructure/web';

const runApp = async () => {
  await loadenv();
  console.log('Environment variables loaded', env.NODE_ENV);
  createServer();
  console.log('Server is running');
};

runApp();
