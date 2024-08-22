import { EXCEL_EXPORTED_TITLES, EXCEL_EXPORTED_TITLE_COLORS, fileResponse, REQUIRED_FIELDS } from '@domain/entities/excel_makro.entity';
import { findIndexOnMatrix, getColorForNumber } from '@fnd/helpers/array_helpers';
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

const ROW_TITLE_FOR_COLORS = 'No Oferta';
const ROW_TITLE_PERCENTAGE = 'Porcentaje';

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

      const indexOriginSheetTitleStarts = findIndexOnMatrix(originalSheetInfoArray as unknown[][], EXCEL_EXPORTED_TITLES as string[]);
      const titlesOriginalRow = originalSheetInfoArray[indexOriginSheetTitleStarts !== -1 ? indexOriginSheetTitleStarts : 6]; //Si no encuentra el titulo, asume que la fila 6 tiene los titulos

      validateAllColumnsExists(originalSheetInfoArray as unknown[][], result, sheetName, titlesOriginalRow as unknown[]);
      const convertedData = processSheet(
        originalSheetInfoArray as unknown[][],
        indexOriginSheetTitleStarts,
        titlesOriginalRow as unknown[]
      );

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
    titlesOriginalRow: unknown[]
  ) => {
    if (originalSheetInfoArray.length === 0) return; //Columnas vacias no se procesan

    const missingColumns = REQUIRED_FIELDS.filter((item: unknown) => !titlesOriginalRow.includes(`${item}`));
    if (missingColumns.length > 0) {
      if (missingColumns.length < 10) {
        result.errors.push(`La hoja "${sheetName}" no tiene las columnas: (${missingColumns.join(', ')}) `);
      } else {
        result.errors.push(`La hoja "${sheetName}" tiene mas de 10 columnas faltantes. `);
      }
    }
    return result;
  };

  const processSheet = (
    originalSheetInfoArray: unknown[][],
    indexOriginalTitleStarts: number,
    titlesOriginalRow: unknown[]
  ): { noOfferByRow: number[]; newFile: unknown[][] } => {
    if (originalSheetInfoArray.length === 0) return { newFile: originalSheetInfoArray, noOfferByRow: [] }; //Columnas vacias no se procesan

    const newJsonDataToExport: unknown[][] = [];
    const noOfferByRow: number[] = [];

    const newTitles = EXCEL_EXPORTED_TITLES;

    newJsonDataToExport.push(newTitles as string[]);

    processRow(
      indexOriginalTitleStarts,
      originalSheetInfoArray,
      noOfferByRow,
      newJsonDataToExport,
      titlesOriginalRow as (number | string)[],
      newTitles as string[]
    );

    return { newFile: newJsonDataToExport, noOfferByRow: noOfferByRow };
  };

  const processRow = (
    indexOriginalTitleStarts: number,
    originalSheetInfoArray: unknown[][],
    noOfferByRow: number[],
    newJsonDataToExport: unknown[][],
    oldTitles: (string | number)[],
    newTitles: string[]
  ) => {
    //Agregar los datos de la hoja de importacion a la hoja de exportacion
    for (let i = indexOriginalTitleStarts + 1; i < originalSheetInfoArray.length; i++) {
      const originalRow = originalSheetInfoArray[i];

      // Si una fila esta completamente vacía no se agrega
      const isEmptyRow = originalRow.every((cell) => cell === null || cell === undefined || cell === '');
      if (isEmptyRow) continue;

      const newRow: unknown[] = [];

      newTitles.forEach((newTitle) => {
        const indexOnOldTitles = oldTitles.indexOf(newTitle);
        const copyOfOriginalRowField = originalRow[indexOnOldTitles];

        if (newTitle === ROW_TITLE_FOR_COLORS) {
          noOfferByRow.push(copyOfOriginalRowField as number);
        }

        if (newTitle.includes(ROW_TITLE_PERCENTAGE)) {
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
                fgColor: { rgb: EXCEL_EXPORTED_TITLE_COLORS[col] },
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
