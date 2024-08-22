import { Range, read, utils, WorkBook, WorkSheet, write } from 'xlsx-js-style';
export type RowData = string | number | undefined;

export type readXlsxFile = (buffer: ArrayBuffer) => Promise<WorkBook>;
export type writeXlsxFile = (workbook: WorkBook) => Uint8Array;
export type convertJsonData = (worksheet: WorkSheet) => RowData[][];
export type arrayToSheetFile = (array: RowData[][]) => WorkSheet;
export type convertToWorkBookFile = (newWorkbook: WorkBook, worksheet: WorkSheet, sheetName: string) => WorkBook;
export type createWorkBookFile = () => WorkBook;
export type decodeRange = (worksheet: WorkSheet) => Range;
export type encodeCellFile = (row: number, col: number) => string;

export const readXlsx: readXlsxFile = async (data: ArrayBuffer) => {
  const workbook = read(data, { type: 'array' });
  return workbook;
};

export const writeXlsx: writeXlsxFile = (workbook: WorkBook) => {
  const binaryData = write(workbook, { type: 'array', bookType: 'xlsx' });

  return binaryData;
};

export const convertWorkSheetToJsonData: convertJsonData = (worksheet: WorkSheet) => {
  const jsonData = utils.sheet_to_json<RowData[]>(worksheet, { header: 1 });
  return jsonData;
};

export const createWorkBook: createWorkBookFile = () => {
  return utils.book_new();
};

export const convertArrayToSheet: arrayToSheetFile = (arrayOfArrays: RowData[][]) => {
  return utils.aoa_to_sheet(arrayOfArrays);
};

export const convertWorkSheetToWorkBook: convertToWorkBookFile = (newWorkbook: WorkBook, worksheet: WorkSheet, sheetName: string) => {
  utils.book_append_sheet(newWorkbook, worksheet, sheetName);
  return newWorkbook;
};

export const decodeSheetRange: decodeRange = (worksheet: WorkSheet) => {
  return utils.decode_range(worksheet['!ref'] ?? '');
};

export const encodeCell: encodeCellFile = (row: number, col: number) => {
  return utils.encode_cell({ r: row, c: col });
};
