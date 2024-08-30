import { fileResponse } from '@domain/entities/excel_makro.entity';
import { processExcelMakro } from 'application/use_cases/process-sheets';
import { NextFunction, Response } from 'express';

const FILE_NAME = 'test.xlsx';
const CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
export class FileSheetController {
  async processFile(req: any, res: Response) {
    try {
      const fileBuffer = req.files[0].buffer;
      const { doc_type } = req.query;

      const result: fileResponse = await processExcelMakro(fileBuffer, doc_type);

      if (result.errors.length > 0) {
        // res.json({ message: result.errors, code: 400 }).status(400);
        res.status(400).json({ code: 400, message: 'Algunos campos son requeridos', metadata: { errors: result.errors } });
      } else {
        res.set('Content-disposition', 'attachment; filename=' + FILE_NAME);
        res.set('Content-Type', CONTENT_TYPE);
        res.write(Buffer.from(result.file || ''), 'binary');
        res.end();
      }
    } catch (err) {
      res.status(400).json({ message: 'Error al procesar el archivo', code: 400 });
    }
  }
}
