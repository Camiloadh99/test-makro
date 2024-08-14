import { build as buildProcessExcelMakro } from './excel_makro';
import { readXlsx, writeXlsx } from '@fnd/libs/process-xlsx';

const processExcelMakro = buildProcessExcelMakro({
  readXlsxFile: readXlsx,
  writeXlsxFile: writeXlsx
});

export { processExcelMakro };
