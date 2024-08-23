import createServer from './infrastructure/web';

const runApp = async () => {
  createServer();
  console.log('Server is running');
};

runApp();
