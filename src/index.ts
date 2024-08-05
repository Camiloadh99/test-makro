import loadenv from 'infrastructure/libs/env';
import createServer from './infrastructure/web';
import { clients, createPSQLConn, isConnected } from 'infrastructure/storage/postgresql';
import { setupModels } from 'infrastructure/storage/postgresql/models/init';

const createDbConnections = async () => {
  const dbName = process.env.DB_NAME || 'tasks-board';
  const dbUser = process.env.DB_USER || 'postgres';
  const dbPassword = process.env.DB_PASSWORD || 'postgres';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '5432';
  const dbKey = process.env.DB_KEY || 'default';

  createPSQLConn(
    {
      databaseName: dbName,
      databaseUser: dbUser,
      databasePassword: dbPassword,
      databaseHost: dbHost,
      databasePort: dbPort,
      databaseDriver: 'postgres'
    },
    dbKey,
    setupModels
  );
  const client = clients.get('default');
  if (client) {
    await client.query('SELECT NOW()');
  } else {
    throw new Error('Client not found');
  }
};

const runApp = async () => {
  await loadenv();
  console.log('Environment variables loaded', process.env.NODE_ENV);
  await createDbConnections();
  console.log('PostgreSQL connection created');
  createServer();
};

runApp();
