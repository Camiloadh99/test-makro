import { middleware } from 'express-openapi-validator';
import { env } from './env/env';

const buildOpenApiMiddelware = () => {
  const apiSpec = env.OPENAPI_FILE_PATH || '/spec';
  const validateResponses = env.OPENAPI_ENABLE_RESPONSE_VALIDATION;

  const validateRequests = env.OPENAPI_ENABLE_REQUEST_VALIDATION;

  const validator = middleware({
    apiSpec,
    validateResponses,
    validateRequests,
    ignorePaths: /contents\/default.*/
  });

  return validator;
};
export { buildOpenApiMiddelware };
