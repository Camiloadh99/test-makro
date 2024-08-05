import { HTTPCodesEnum } from './enums/error.enum';
export class BaseError extends Error {
  status: number;
  _stack: any;
  error: string;
  metadata: any;

  constructor(message: string, status?: number, metadata?: any) {
    super(message || 'Default error');
    this.error = this.message;
    this.status = status || HTTPCodesEnum.INTERNAL_SERVER_ERROR;
    this._stack = this.stack;
    this.metadata = metadata;
  }
}
