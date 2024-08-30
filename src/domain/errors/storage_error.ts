import { BaseError } from './base_error';

type Status = 500 | 404;

export class StorageError extends BaseError {
  constructor(message: string, status: Status = 500, metatada?: any) {
    super(message, status, metatada);
  }
}
