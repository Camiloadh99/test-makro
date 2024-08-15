import { NextFunction, Request, Response } from 'express';
import * as info from '../../../package.json';
import { env } from '@fnd/libs/env';

const svc = env.APP_ID || 'Service';
const environment = env.NODE_ENV || 'development';

export type Healthy = {
  message: string;
  environment: string;
  version: string;
};

const healthy: Healthy = {
  message: `${svc} OK 👽`,
  environment: environment,
  version: info.version
};

export class HealthyController {
  get(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200);
      res.send(healthy);
    } catch (error) {
      next(error);
    }
  }

  readiness(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200);
      res.send(healthy);
    } catch (error) {
      next(error);
    }
  }

  health(req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200);
      res.send(healthy);
    } catch (error) {
      next(error);
    }
  }
}
