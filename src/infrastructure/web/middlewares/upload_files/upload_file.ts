import { ALLOWED_MIMETYPES } from '@domain/entities/excel_makro.entity';
import { ErrorBadRequest } from '@domain/errors/bad_request';
import multer from '@fnd/libs/multer';
import { NextFunction, Request, Response } from 'express';

const upload = multer();

const TOO_LARGE_FILE_RESPONSE = 'File size too large, max 200MB';
const NOT_VALID_FILE_RESPONSE = 'Invalid file extension, only XLSX file allowed';
const NO_FILES_RESPONSE = 'No file uploaded';
const TOO_LARGE_FILE_SIZE = 200000000;

const uploadFileMiddleware = () => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    upload.single('file');
    if (Array.isArray(req.files)) {
      if (req.files.length === 0) throw new ErrorBadRequest(NO_FILES_RESPONSE);

      const file = req.files[0];

      if (!ALLOWED_MIMETYPES.includes(file.mimetype)) throw new ErrorBadRequest(NOT_VALID_FILE_RESPONSE);

      if (file.size > TOO_LARGE_FILE_SIZE) throw new ErrorBadRequest(TOO_LARGE_FILE_RESPONSE);
    }

    next();
  };

  return middleware;
};

export default uploadFileMiddleware;
