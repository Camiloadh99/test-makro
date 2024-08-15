import pino, { Logger } from 'pino';
import path from 'path';
import { env } from './env';

const environment = env.NODE_ENV || 'development';

const LOG_LEVEL = environment === 'development' ? 'debug' : 'warn';

const NAMESPACE_ROOT = env.NAMESPACE_ROOT !== undefined ? env.NAMESPACE_ROOT.replace(':*', '') : 'src:*'.replace(':*', '');

export type LoggerFn = (absoluteFilePath?: string) => Logger;

const init: LoggerFn = (absoluteFilePath = '') => {
  if (absoluteFilePath === '') return pino({ name: NAMESPACE_ROOT, level: LOG_LEVEL });
  else {
    return pino({
      name: `${NAMESPACE_ROOT}:${path
        .relative(__dirname, absoluteFilePath)
        .replace(/.js/gi, '')
        .replace(/.ts/gi, '')
        .replace(/\//g, ':')
        .replace(/\.\.:/g, '')}`,
      level: LOG_LEVEL
    });
  }
};

export default init;
