import { build as buildProcessExcelMakro } from './excel_makro';
import { readXlsx, writeXlsx, convertToJsonData } from '@fnd/libs/process-xlsx';

const processExcelMakro = buildProcessExcelMakro({
  readXlsxFile: readXlsx,
  writeXlsxFile: writeXlsx,
  convertToJsonData: convertToJsonData
});

export { processExcelMakro };
