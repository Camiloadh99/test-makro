import { excelExportedTitles, excelExportedTitlesColors, excelFieldsTitles, fileResponse } from '@domain/entities/excel_makro.entity';
import { findIndexOfArrayOfArrayByString, getColorForNumber } from '@fnd/helpers/array_helpers';
import {
  arrayToSheetFile,
  convertJsonData,
  convertToWorkBookFile,
  readXlsxFile,
  writeXlsxFile,
  createWorkBookFile,
  decodeRange,
  encodeCellFile
} from '@fnd/libs/process-xlsx';
import { WorkSheet } from 'xlsx-js-style';

type Dependencies = {
  readXlsxFile: readXlsxFile;
  writeXlsxFile: writeXlsxFile;
  convertWorkSheetToJsonData: convertJsonData;
  convertArrayToSheet: arrayToSheetFile;
  convertWorkSheetToWorkBook: convertToWorkBookFile;
  createWorkBook: createWorkBookFile;
  decodeSheetRange: decodeRange;
  encodeCell: encodeCellFile;
};

export const build = ({
  readXlsxFile,
  writeXlsxFile,
  convertWorkSheetToJsonData,
  convertArrayToSheet,
  convertWorkSheetToWorkBook,
  createWorkBook,
  decodeSheetRange,
  encodeCell
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

      const worksheetToExport = convertArrayToSheet(convertedData.newFile as unknown[][]);
      applyStyles(worksheetToExport, convertedData.noOfferByRow);

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

  const convertImportSheetToExportSheet = (
    originalSheetInfoArray: unknown[][],
    indexOriginalTitleStarts: number
  ): { noOfferByRow: number[]; newFile: unknown[][] } => {
    if (originalSheetInfoArray.length === 0) return { newFile: originalSheetInfoArray, noOfferByRow: [] }; //Columnas vacias no se procesan

    const newJsonDataToExport: unknown[][] = [];
    const noOfferByRow: number[] = [];

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

        if (title === 'No Oferta') {
          noOfferByRow.push(copyOfOriginalRowField as number);
        }

        if (title.includes('Porcentaje')) {
          const discount = copyOfOriginalRowField as string;
          newRow.push(discount ? `${+discount * 100}%` : copyOfOriginalRowField || '');
        } else if (typeof copyOfOriginalRowField === 'number') {
          newRow.push(`${parseFloat(copyOfOriginalRowField?.toFixed())}`);
        } else {
          newRow.push(copyOfOriginalRowField || '');
        }
      });

      newJsonDataToExport.push(newRow);
    }

    return { newFile: newJsonDataToExport, noOfferByRow: noOfferByRow };
  };

  const applyStyles = (worksheet: WorkSheet, noOfferByRow: number[]) => {
    const range = decodeSheetRange(worksheet);
    const rowCount = range.e.r;
    const columnCount = range.e.c;

    const columnWidths = Array.from({ length: columnCount + 1 }, () => ({ wpx: 150 }));
    const dataRowHeight = Array.from({ length: rowCount }, () => ({ hpt: 30 }));
    worksheet['!cols'] = columnWidths;
    worksheet['!rows'] = dataRowHeight;

    const borderStyles = {
      top: { style: 'thin', color: { rgb: '000000' } },
      bottom: { style: 'thin', color: { rgb: '000000' } },
      left: { style: 'thin', color: { rgb: '000000' } },
      right: { style: 'thin', color: { rgb: '000000' } }
    };
    const fontStyles = {
      name: 'Arial',
      sz: 12
    };

    for (let row = 0; row <= rowCount; row++) {
      for (let col = 0; col <= columnCount; col++) {
        const cellRef = encodeCell(row, col);

        if (worksheet[cellRef]) {
          if (row === 0) {
            worksheet[cellRef].s = {
              alignment: {
                horizontal: 'center',
                wrapText: true
              },
              font: {
                ...fontStyles,
                color: { rgb: 'FFFFFF' },
                weight: 'bold'
              },
              border: borderStyles,
              fill: {
                fgColor: { rgb: excelExportedTitlesColors[col] },
                patternType: 'solid'
              }
            };
          } else {
            // Add this format to every cell
            worksheet[cellRef].s = {
              alignment: {
                horizontal: 'left',
                wrapText: true
              },
              font: {
                ...fontStyles,
                color: { rgb: '000000' }
              },
              border: borderStyles,
              fill: {
                fgColor: { rgb: getColorForNumber(noOfferByRow[row - 1]) },
                patternType: 'solid'
              }
            };
          }
        }
      }
    }
    return worksheet;
  };

  return execute;
};
