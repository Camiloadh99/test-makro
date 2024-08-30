import {
  EXCEL_EXPORTED_TITLES,
  EXCEL_EXPORTED_TITLE_COLORS,
  fileResponse,
  REQUIRED_FIELDS,
  REQUIRED_FIELDS_SPECIAL,
  EXCEL_EXPORTED_TITLES_SPECIAL
} from '@domain/entities/excel_makro.entity';
import {
  convertRowDataToStringArray,
  deleteLineBreakString,
  findIndexOnMatrix,
  getColorForNumber,
  uppercaseFirstLetters
} from '@fnd/helpers/array_helpers';
import {
  arrayToSheetFile,
  convertJsonData,
  convertToWorkBookFile,
  readXlsxFile,
  writeXlsxFile,
  createWorkBookFile,
  decodeRange,
  encodeCellFile,
  RowData
} from '@fnd/libs/process-xlsx';
import { ColInfo, utils, WorkSheet } from 'xlsx-js-style';

import path from 'path';
import { readFileSync } from 'fs';
import { customWidths, DEFAULT_STYLES_PAGE1, DEFAULT_STYLES_PAGE2, IDefaultSheet } from '@domain/entities/default_sheets.entity';

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
const ROW_TITLE_CODE = 'Código';
const ROW_TITLE_DESCRIPTION = 'Descripcion';
const ROW_TITLE_UNITS = 'Unidades Disponibles';

const TITLE_DEFAULT_SHEET_1 = 'Vigencia ';
const TITLE_DEFAULT_SHEET_2 = 'Respuesta Comercial';

type IDocType = 'specia_brief' | 'weekly_brief';

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
  const execute = async (xlsxFile: Buffer, docType: IDocType) => {
    const result: fileResponse = {
      file: null,
      errors: []
    };
    //** Read File */
    const workbook = await readXlsxFile(xlsxFile);
    const workbookToExport = createWorkBook();

    //**Add deafult pages */
    const defaultSheetPath = path.resolve(__dirname, '../../../domain/entities/sheets/brief_semanal.xlsx');
    const defaultSheetBuffer = readFileSync(defaultSheetPath);

    const defaultWorkBook = await readXlsxFile(defaultSheetBuffer);

    const defaultSheetPage1 = defaultWorkBook.Sheets[TITLE_DEFAULT_SHEET_1 || defaultWorkBook.SheetNames[0]]; //Hoja de Vigencia
    const defaultSheetPage2 = defaultWorkBook.Sheets[TITLE_DEFAULT_SHEET_2]; //Hoja de Vigencia

    //** Agregando primer pagina por defecto */
    const stylesDefaultSheet1 = copySheetWithStyles(defaultSheetPage1, DEFAULT_STYLES_PAGE1);
    const stylesDefaultSheet2 = copySheetWithStyles(defaultSheetPage2, DEFAULT_STYLES_PAGE2, customWidths);
    convertWorkSheetToWorkBook(workbookToExport, stylesDefaultSheet1, TITLE_DEFAULT_SHEET_1);

    const titlesToProcess = docType == 'specia_brief' ? EXCEL_EXPORTED_TITLES_SPECIAL : EXCEL_EXPORTED_TITLES;
    //** Proccess */
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      const originalSheetInfoArray = convertWorkSheetToJsonData(worksheet); //convertir la hoja a un array con los elementos internos

      const indexOriginSheetTitleStarts = findIndexOnMatrix(originalSheetInfoArray, [...titlesToProcess]);
      const titlesOriginalRow = originalSheetInfoArray[indexOriginSheetTitleStarts !== -1 ? indexOriginSheetTitleStarts : 6]; //Si no encuentra el titulo, asume que la fila 6 tiene los titulos
      const titlesOriginalRowString = convertRowDataToStringArray(titlesOriginalRow);

      validateAllColumnsExists(originalSheetInfoArray, result, sheetName, titlesOriginalRowString, docType);
      const convertedData = processSheet(originalSheetInfoArray, indexOriginSheetTitleStarts, titlesOriginalRowString, [
        ...titlesToProcess
      ]);

      if (result.errors.length > 0) return;

      const worksheetToExport = convertArrayToSheet(convertedData.newFile);
      applyStyles(worksheetToExport, convertedData.noOfferByRow);

      convertWorkSheetToWorkBook(workbookToExport, worksheetToExport, sheetName);
    });

    //**Ultimas paginas  */
    convertWorkSheetToWorkBook(workbookToExport, stylesDefaultSheet2, TITLE_DEFAULT_SHEET_2);

    //** Return File */
    if (result.errors.length > 0) return { file: null, errors: result.errors };

    const stream = writeXlsxFile(workbookToExport);

    return {
      file: stream,
      errors: result.errors
    };
  };

  const validateAllColumnsExists = (
    originalSheetInfoArray: RowData[][],
    result: fileResponse,
    sheetName: string,
    titlesOriginalRow: string[],
    docType: IDocType
  ) => {
    if (originalSheetInfoArray.length === 0) return; //Columnas vacias no se procesan
    const allClear = originalSheetInfoArray.every((array) => array.length === 0);
    if (allClear) return;

    //Algunos titulos tienen el salto de linea \n, por lo que se eliminan para comparar
    const fieldsToProcess = docType === 'specia_brief' ? REQUIRED_FIELDS_SPECIAL : REQUIRED_FIELDS;
    const reqTitlesWithoutBreakLine = fieldsToProcess.map((item) => deleteLineBreakString(item));
    const missingColumns = reqTitlesWithoutBreakLine.filter((item) => !titlesOriginalRow.includes(`${item}`));
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
    originalSheetInfoArray: RowData[][],
    indexOriginalTitleStarts: number,
    titlesOriginalRow: string[],
    titlesToProcess: string[]
  ): { noOfferByRow: number[]; newFile: RowData[][] } => {
    if (originalSheetInfoArray.length === 0 || titlesOriginalRow.length === 0) return { newFile: originalSheetInfoArray, noOfferByRow: [] }; //Columnas vacias no se procesan

    const newJsonDataToExport: RowData[][] = [];
    const noOfferByRow: number[] = [];

    const newTitles = [...titlesToProcess];

    newJsonDataToExport.push(newTitles.map((item: string) => deleteLineBreakString(item)) as string[]);

    processRow(
      indexOriginalTitleStarts,
      originalSheetInfoArray,
      noOfferByRow,
      newJsonDataToExport,
      titlesOriginalRow,
      convertRowDataToStringArray(newTitles)
    );

    return { newFile: newJsonDataToExport, noOfferByRow: noOfferByRow };
  };

  const processRow = (
    indexOriginalTitleStarts: number,
    originalSheetInfoArray: RowData[][],
    noOfferByRow: number[],
    newJsonDataToExport: RowData[][],
    oldTitles: (string | number)[],
    newTitles: string[]
  ) => {
    //Agregar los datos de la hoja de importacion a la hoja de exportacion
    for (let i = indexOriginalTitleStarts + 1; i < originalSheetInfoArray.length; i++) {
      const originalRow = originalSheetInfoArray[i];

      // Si una fila esta completamente vacía no se agrega
      const isEmptyRow = originalRow.every((cell) => cell === null || cell === undefined || cell === '' || cell === 0);
      if (isEmptyRow) continue;

      const newRow: RowData[] = [];

      newTitles.forEach((newTitle) => {
        const indexOnOldTitles = oldTitles.findIndex((item) => item === newTitle);
        const isCell0Undefined = originalRow[0] === undefined;
        const searchIndex = isCell0Undefined ? 1 : 0; // algunas veces no viene el emento 0
        const copyOfOriginalRowField = originalRow[indexOnOldTitles + searchIndex];

        if (newTitle === ROW_TITLE_FOR_COLORS) {
          noOfferByRow.push(Number(copyOfOriginalRowField));
        }

        if (newTitle.includes(ROW_TITLE_PERCENTAGE)) {
          const discount = copyOfOriginalRowField;
          newRow.push(discount ? `${+discount * 100}%` : copyOfOriginalRowField || '');
        } else if (newTitle === ROW_TITLE_DESCRIPTION) {
          const description =
            typeof copyOfOriginalRowField === 'string' ? uppercaseFirstLetters(deleteLineBreakString(copyOfOriginalRowField)) : '';
          newRow.push(description || '');
        } else if (typeof copyOfOriginalRowField === 'number') {
          newRow.push(`${parseFloat(copyOfOriginalRowField?.toFixed())}`);
        } else {
          newRow.push(
            typeof copyOfOriginalRowField === 'string' ? deleteLineBreakString(copyOfOriginalRowField) : copyOfOriginalRowField || ''
          );
        }
      });

      newJsonDataToExport.push(newRow);
    }
    mergeCodesAndUnits(newJsonDataToExport);
  };

  const mergeCodesAndUnits = (newJsonDataToExport: RowData[][]) => {
    const titlesNewSheet = newJsonDataToExport[0];

    const indexOfNoOffer = titlesNewSheet.findIndex((item) => item === ROW_TITLE_FOR_COLORS);
    const indexOfProductCode = titlesNewSheet.findIndex((item) => item === ROW_TITLE_CODE);
    const indexOfUnits = titlesNewSheet.findIndex((item) => item === ROW_TITLE_UNITS);

    let currentOffer: string | null = null;
    let currentProductCodes: string[] = [];
    let currentUnitsAvailable: number[] = [];
    let currentRow: RowData[] | null = null;

    for (let rowIndex = 1; rowIndex < newJsonDataToExport.length; rowIndex++) {
      const row = newJsonDataToExport[rowIndex];
      const offer = `${row[indexOfNoOffer]}`;
      const unitsAvailable = `${row[indexOfUnits]}`;
      const productCode = row[indexOfProductCode];

      if (offer === currentOffer) {
        currentProductCodes.push(productCode as string);
        currentUnitsAvailable.push(Number(unitsAvailable));
      } else {
        if (currentRow) {
          //merge product codes
          currentRow[indexOfProductCode] = currentProductCodes.join('-');

          //merge units available
          const unitsAvailableTotal = currentUnitsAvailable.reduce((acc, curr) => Math.abs(acc) + Math.abs(curr), 0);
          currentRow[indexOfUnits] = unitsAvailableTotal && unitsAvailableTotal > 0 ? unitsAvailableTotal : 150;
        }
        currentOffer = `${offer}`;
        currentProductCodes = [`${productCode}`];
        currentUnitsAvailable = [Number(unitsAvailable)];
        currentRow = row;
      }
    }
    if (currentRow) {
      currentRow[indexOfProductCode] = currentProductCodes.join('-');
    }
  };

  const applyStyles = (worksheet: WorkSheet, noOfferByRow: number[]) => {
    const range = decodeSheetRange(worksheet);
    const rowCount = range.e.r;
    const columnCount = range.e.c;

    const columnWidths = Array.from({ length: columnCount + 1 }, () => ({ wpx: 150 }));
    const dataRowHeight = Array.from({ length: rowCount }, () => ({ hpt: 45 }));
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

  const copySheetWithStyles = (sourceSheet: WorkSheet, sheetStyle: IDefaultSheet[], customWidths?: ColInfo[]) => {
    const range = decodeSheetRange(sourceSheet);
    const columnCount = range.e.c;

    const columnWidths = Array.from({ length: columnCount + 1 }, () => ({ wpx: 150 }));
    sourceSheet['!cols'] = customWidths ?? columnWidths;

    sheetStyle.forEach((style) => {
      const cellRef = style.ref;
      if (sourceSheet[cellRef]) {
        sourceSheet[cellRef].s = style.style;
      } else {
        sourceSheet[cellRef] = { v: '', s: style.style };
      }
    });
    return sourceSheet;
  };

  return execute;
};
