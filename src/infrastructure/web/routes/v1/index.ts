import { Router } from 'express';
import fileSheetsRouter from './file_sheets/file_sheets_routes';

const router = Router();

router.use('/file-sheets', fileSheetsRouter);

export default router;
