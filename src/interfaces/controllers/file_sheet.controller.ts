import { processExcelMakro } from 'application/use_cases/process-sheets';
import { NextFunction, Response } from 'express';

const FILE_NAME = 'test.xlsx';
const CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export class FileSheetController {
  async processFile(req: any, res: Response, next: NextFunction) {
    try {
      console.log(req);
      const fileBuffer = req.files[0].buffer;
      const result: Uint8Array = await processExcelMakro(fileBuffer);

      res.set('Content-disposition', 'attachment; filename=' + FILE_NAME);
      res.set('Content-Type', CONTENT_TYPE);
      res.write(Buffer.from(result), 'binary');
      res.end();
    } catch (err) {
      next(err);
    }
  }
}
