import uploadFileMiddleware from '@fnd/web/middlewares/upload_files/upload_file';
import { Router } from 'express';
import { FileSheetController } from 'interfaces/controllers/file_sheet.controller';

const controller = new FileSheetController();

const router = Router();

router.post('/process', uploadFileMiddleware(), controller.processFile);

export default router;
