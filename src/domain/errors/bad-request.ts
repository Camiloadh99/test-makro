import { BaseError } from './base-error';
import { HTTPCodesEnum } from './enums/error.enum';

export class ErrorBadRequest extends BaseError {
  constructor(message: string, metadata?: any) {
    super(`${message}`, HTTPCodesEnum.BAD_REQUEST, metadata);
  }
}
