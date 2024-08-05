import { HTTPCodesEnum } from './enums/error.enum';
class ApiError {
  code: number;
  message: string;
  metadata: any;

  constructor(code: number, message: string, metadata?: any) {
    this.code = code || HTTPCodesEnum.INTERNAL_SERVER_ERROR;
    this.message = message || 'Internal server error';
    this.metadata = metadata;
  }
}

export { ApiError };
