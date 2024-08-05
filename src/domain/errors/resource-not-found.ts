import { BaseError } from './base-error';
import { HTTPCodesEnum } from './enums/error.enum';

export class ErrorResourceNotFound extends BaseError {
  constructor(message: string, metadata?: any) {
    super(message, HTTPCodesEnum.RESOURCE_NOT_FOUND, metadata);
  }
}
