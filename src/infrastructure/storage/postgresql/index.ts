import { Dialect, Sequelize } from 'sequelize';

type PostgresConfig = {
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  databaseHost: string;
  databasePort: string;
  databaseDriver: Dialect;
};

type SetupModelsCallback = (sequelize: Sequelize) => void;

export const clients: Map<string, Sequelize> = new Map();
export const createPSQLConn = async (
  { databaseName, databaseUser, databasePassword, databaseHost, databasePort, databaseDriver }: PostgresConfig,
  keyName: string,
  setupModelsCallback: SetupModelsCallback
) => {
  const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    port: +databasePort,
    host: databaseHost,
    dialect: databaseDriver,
    logging: (msg) => console.log(`[DB LOG]: ${msg}`)
  });
  clients.set(keyName, sequelize);

  if (await isConnected(sequelize)) {
    setupModelsCallback(sequelize);
    await sequelize.sync();
  } else {
    throw new Error('Unable to connect to the database');
  }
};

export const isConnected = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully to PostgreSQL.');
    return true;
  } catch (err: unknown) {
    if (err instanceof Error) console.error('Unable to connect to the database:', err);
    return false;
  }
};
