import { z } from 'zod';

export const envSchema = z.object({
  // Env vars for deployments if it is required
  APP_ID: z.string().default('MAP'),
  NAMESPACE_ROOT: z.string().default('src:*'),

  // App environment vars
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().min(1000).default(3000),
  BOOL_EXAMPLE: z.coerce.boolean().default(false),
  OPENAPI_FILE_PATH: z.string().default('./oas3.yaml'),
  OPENAPI_DOCS: z.string().default('/docs'),
  OPENAPI_ENABLE_RESPONSE_VALIDATION: z.coerce.boolean().default(true),
  OPENAPI_ENABLE_REQUEST_VALIDATION: z.coerce.boolean().default(true),
  MAX_FILE_SIZE: z.coerce.number().default(1024 * 1024 * 10)
});

export type Env = z.infer<typeof envSchema>;
