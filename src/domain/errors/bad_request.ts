import { BaseError } from './base_error';

export class ErrorBadRequest extends BaseError {
  constructor(message: string, metatada?: any) {
    super(message, 400, metatada);
  }
}
