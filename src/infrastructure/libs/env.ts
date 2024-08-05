const loadenv = async (debug = false) => {
  const dotenv = await import('dotenv');
  let path = '.env';
  dotenv.config({ debug, path });
  const ENV = process.env.NODE_ENV ?? 'development';

  if (ENV === 'development') {
    debug = true;
    path = '.env.dev';
  } else if (ENV === 'production') {
    debug = false;
    path = '.env.prod';
  } else if (ENV === 'staging') {
    debug = false;
    path = '.env.staging';
  }

  dotenv.config({ debug, path });
};

export default loadenv;
