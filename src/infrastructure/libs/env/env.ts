// Only this file can use process.env
/* eslint-disable no-restricted-properties */
import { Env, envSchema } from './env-schema';

enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging'
}

export let env: Env;

const loadenv = async (debug = false) => {
  const dotenv = await import('dotenv');
  let path = '.env';
  const ENV = process.env.NODE_ENV ?? 'development';

  if (ENV === Environment.Development) {
    debug = true;
    path = '.env.dev';
  } else if (ENV === Environment.Production) {
    debug = false;
    path = '.env.prod';
  } else if (ENV === Environment.Staging) {
    debug = false;
    path = '.env.staging';
  }

  console.log(`Loading environment variables from ${path} for ${ENV}`);
  dotenv.config({ debug, path });
  env = envSchema.parse(process.env);
  console.log('Environment variables loaded', env);
};

export default loadenv;
