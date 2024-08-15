import { ErrorBadRequest } from '@domain/errors/bad_request';
import multer from '@fnd/libs/multer';
import { NextFunction, Request, Response } from 'express';

const upload = multer();

const uploadFileMiddleware = () => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    upload.single('file');
    if (Array.isArray(req.files)) {
      if (req.files.length === 0) throw new ErrorBadRequest('No file uploaded');

      const file = req.files[0];
      console.log(file.mimetype);

      if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        throw new ErrorBadRequest('Invalid file extension, only XLSX file allowed');

      if (file.size > 15000000) throw new ErrorBadRequest('File size too large, max 15MB');
    }

    next();
  };

  return middleware;
};

export default uploadFileMiddleware;
