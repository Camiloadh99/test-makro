import { build as buildProcessExcelMakro } from './excel_makro';
import { readXlsx, writeXlsx, convertToJsonData, convertArrayToSheet, convertToWorkBook, createWorkBook } from '@fnd/libs/process-xlsx';

const processExcelMakro = buildProcessExcelMakro({
  readXlsxFile: readXlsx,
  writeXlsxFile: writeXlsx,
  convertToJsonData: convertToJsonData,
  convertArrayToSheet: convertArrayToSheet,
  convertToWorkBook: convertToWorkBook,
  createWorkBook: createWorkBook
});

export { processExcelMakro };
