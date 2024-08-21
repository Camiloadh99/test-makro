import { build as buildProcessExcelMakro } from './excel_makro';
import {
  readXlsx,
  writeXlsx,
  convertWorkSheetToJsonData,
  convertArrayToSheet,
  convertWorkSheetToWorkBook,
  createWorkBook,
  decodeSheetRange,
  encodeCell
} from '@fnd/libs/process-xlsx';

const processExcelMakro = buildProcessExcelMakro({
  readXlsxFile: readXlsx,
  writeXlsxFile: writeXlsx,
  convertWorkSheetToJsonData: convertWorkSheetToJsonData,
  convertArrayToSheet: convertArrayToSheet,
  convertWorkSheetToWorkBook: convertWorkSheetToWorkBook,
  createWorkBook: createWorkBook,
  decodeSheetRange: decodeSheetRange,
  encodeCell: encodeCell
});

export { processExcelMakro };
