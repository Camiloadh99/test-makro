import { Request, Response } from 'express';
import { getAll } from '../../application/use_cases';

export class UsersController {
  async getUsers(req: Request, res: Response) {
    const result = await getAll();
    res.json(result).status(200);
  }
}
