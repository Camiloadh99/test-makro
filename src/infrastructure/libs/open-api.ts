import { middleware } from 'express-openapi-validator';

const buildOpenApiMiddelware = () => {
  const apiSpec = './oas3.yaml';
  const validateResponses = true;

  const validateRequests = true;

  const validator = middleware({
    apiSpec,
    validateResponses,
    validateRequests,
    ignorePaths: /contents\/default.*/
  });

  return validator;
};
export { buildOpenApiMiddelware };
