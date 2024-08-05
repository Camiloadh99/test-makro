/**YAML library */
import YAML from 'yamljs';
/**Swagger UI for express */
import swaggerUi from 'swagger-ui-express';
/**Load YAML files */
const swaggerDocument = YAML.load('./oas3.yaml');

export { swaggerUi, swaggerDocument };
