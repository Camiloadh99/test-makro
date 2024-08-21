import { excelExportedTitles, excelFieldsTitles, fileResponse } from '@domain/entities/excel_makro.entity';
import { findIndexOfArrayOfArrayByString } from '@fnd/helpers/array_helpers';
import {
  arrayToSheetFile,
  convertJsonData,
  convertToWorkBookFile,
  readXlsxFile,
  writeXlsxFile,
  createWorkBookFile
} from '@fnd/libs/process-xlsx';

type Dependencies = {
  readXlsxFile: readXlsxFile;
  writeXlsxFile: writeXlsxFile;
  convertWorkSheetToJsonData: convertJsonData;
  convertArrayToSheet: arrayToSheetFile;
  convertWorkSheetToWorkBook: convertToWorkBookFile;
  createWorkBook: createWorkBookFile;
};

export const build = ({
  readXlsxFile,
  writeXlsxFile,
  convertWorkSheetToJsonData,
  convertArrayToSheet,
  convertWorkSheetToWorkBook,
  createWorkBook
}: Dependencies) => {
  const execute = async (xlsxFile: Buffer) => {
    const result: fileResponse = {
      file: null,
      errors: []
    };
    //** Read File */
    const workbook = await readXlsxFile(xlsxFile);
    const workbookToExport = createWorkBook();

    //** Proccess */
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      const originalSheetInfoArray = convertWorkSheetToJsonData(worksheet); //convertir la hoja a un array con los elementos internos

      const indexOriginSheetTitleStarts = findIndexOfArrayOfArrayByString(originalSheetInfoArray as unknown[][], `${excelFieldsTitles[0]}`);

      validateAllColumnsExists(originalSheetInfoArray as unknown[][], result, sheetName, indexOriginSheetTitleStarts);
      const convertedData = convertImportSheetToExportSheet(originalSheetInfoArray as unknown[][], indexOriginSheetTitleStarts);

      if (result.errors.length > 0) return;

      const worksheetToExport = convertArrayToSheet(convertedData as unknown[][]);

      convertWorkSheetToWorkBook(workbookToExport, worksheetToExport, sheetName);
    });

    //** Return File */
    if (result.errors.length > 0) return { file: null, errors: result.errors };

    const stream = writeXlsxFile(workbookToExport);

    return {
      file: stream,
      errors: result.errors
    };
  };

  const validateAllColumnsExists = (
    originalSheetInfoArray: unknown[][],
    result: fileResponse,
    sheetName: string,
    indexTitleStarts: number
  ) => {
    if (originalSheetInfoArray.length === 0) return; //Columnas vacias no se procesan

    const valuesFields = originalSheetInfoArray[indexTitleStarts !== -1 ? indexTitleStarts : 6]; //Si no encuentra el titulo, asume que la fila 6 tiene los titulos

    const missingColumns = excelFieldsTitles.filter((item: string | number) => !valuesFields.includes(item));
    if (missingColumns.length > 0) {
      if (missingColumns.length < 10) {
        result.errors.push(`La hoja "${sheetName}" no tiene las columnas: (${missingColumns.join(', ')}) `);
      } else {
        result.errors.push(`La hoja "${sheetName}" tiene mas de 10 columnas faltantes. `);
      }
    }
    return result;
  };

  const convertImportSheetToExportSheet = (originalSheetInfoArray: unknown[][], indexOriginalTitleStarts: number): unknown[][] => {
    if (originalSheetInfoArray.length === 0) return originalSheetInfoArray; //Columnas vacias no se procesan

    const newJsonDataToExport: unknown[][] = [];

    //Agregar nuevos titulos (solo los que necesitan)
    const oldTitles = excelFieldsTitles;
    const newTitles = excelExportedTitles;
    newJsonDataToExport.push(newTitles);

    //Agregar los datos de la hoja de importacion a la hoja de exportacion
    for (let i = indexOriginalTitleStarts + 1; i < originalSheetInfoArray.length; i++) {
      const originalRow = originalSheetInfoArray[i];

      // Si una fila esta completamente basia no se agrega
      const isEmptyRow = originalRow.every((cell) => cell === null || cell === undefined || cell === '');
      if (isEmptyRow) continue;

      const newRow: unknown[] = [];

      newTitles.forEach((title) => {
        const indexOnOldTitles = oldTitles.indexOf(title) + 1;
        const copyOfOriginalRowField = originalRow[indexOnOldTitles];

        if (title.includes('Porcentaje')) {
          const discount = copyOfOriginalRowField as string;
          newRow.push(discount ? `${+discount * 100}%` : copyOfOriginalRowField);
        } else if (typeof copyOfOriginalRowField === 'number') {
          newRow.push(`${parseFloat(copyOfOriginalRowField?.toFixed())}`);
        } else {
          newRow.push(copyOfOriginalRowField);
        }
      });

      newJsonDataToExport.push(newRow);
    }

    return newJsonDataToExport;
  };

  return execute;
};
