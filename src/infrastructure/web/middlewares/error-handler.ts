import { Request, Response, NextFunction } from 'express';
import logger from '@fnd/libs/logger';
import { ApiError } from '@domain/errors/api-error';
import { HTTPCodesEnum } from '@domain/errors/enums/error.enum';

const Logger = logger(__filename);
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

const ERROR_HANDLERS: { [key: string]: any } = {
  AxiosError: (e: any) => {
    const { response } = e;
    const { request } = e.response;
    const { responseUrl, headers } = request.res;
    const metadata = {
      url: responseUrl,
      http_data: response.data.errors
    };
    Logger.error(
      `External API Error [${response.status}] - Headers: ${JSON.stringify(headers)} - Error Data: ${JSON.stringify(e.response.data.errors)}
            - Error STACK: ${e.stack}`
    );
    return {
      httpCode: HTTPCodesEnum.BAD_REQUEST,
      error: new ApiError(response.status, e.message, metadata)
    };
  },
  ErrorBadRequest: (e: any) => {
    Logger.error(
      `Validation Error [${e.status}] - Error Data: ${JSON.stringify(e.errors)}
            - Error STACK: ${e.stack}`
    );
    return {
      httpCode: HTTPCodesEnum.BAD_REQUEST,
      error: new ApiError(e.status, e.message)
    };
  },
  StorageError: (e: any) => {
    Logger.error(
      `Validation Error [${e.status}] - Error Data: ${e.metadata}
            - Error STACK: ${e.stack}`
    );
    return {
      httpCode: HTTPCodesEnum.BAD_REQUEST,
      error: new ApiError(e.status, e.message)
    };
  },
  ErrorResourceNotFound: (e: any) => {
    Logger.error(
      `Validation Error [${e.status}] - Error Data: ${e.metadata}
            - Error STACK: ${e.stack}`
    );
    return {
      httpCode: HTTPCodesEnum.RESOURCE_NOT_FOUND,
      error: new ApiError(e.status, e.message)
    };
  },
  ErrorAuthentication: (e: any) => {
    Logger.error(
      `Validation Error [${e.status}] - Error Data: ${e.metadata}
            - Error STACK: ${e.stack}`
    );
    return {
      httpCode: HTTPCodesEnum.UNAUTHORIZED,
      error: new ApiError(e.status, e.message)
    };
  },
  BSONTypeError: (e: any) => {
    Logger.error(
      `Validation Error - Error Data: ${e.message}
            - Error STACK: ${e.stack}`
    );
    return {
      httpCode: HTTPCodesEnum.BAD_REQUEST,
      error: new ApiError(HTTPCodesEnum.BAD_REQUEST, e.message)
    };
  },
  defaultError: () => {
    return {
      httpCode: HTTPCodesEnum.INTERNAL_SERVER_ERROR,
      error: new ApiError(HTTPCodesEnum.INTERNAL_SERVER_ERROR, 'API error')
    };
  }
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
    return;
  }
  /**Logging Error */
  Logger.error(`ERROR: ${err.message} STACK : ${err.stack}`);
  const errorHandlerFnc = ERROR_HANDLERS[err.constructor.name] || ERROR_HANDLERS.defaultError;
  let { httpCode, error } = errorHandlerFnc(err);
  if (!httpCode) httpCode = HTTPCodesEnum.INTERNAL_SERVER_ERROR;
  if (!error) error = 'Internal server error';
  res.status(httpCode).json(error);
};
