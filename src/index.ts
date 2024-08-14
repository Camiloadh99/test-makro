import loadenv from 'infrastructure/libs/env';
import createServer from './infrastructure/web';

const runApp = async () => {
  await loadenv();
  console.log('Environment variables loaded', process.env.NODE_ENV);
  createServer();
  console.log('Server is running');
};

runApp();
