import { NextFunction, Request, Response } from 'express';
import * as info from '../../../package.json';

const svc = process.env.APP_ID || 'Service';
const env = process.env.NODE_ENV || 'development';

export type Healthy = {
  message: string;
  environment: string;
  version: string;
};

const healthy: Healthy = {
  message: `${svc} OK 👽`,
  environment: env,
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
