import { read, utils, WorkBook, WorkSheet, write } from 'xlsx';

export type readXlsxFile = (buffer: ArrayBuffer) => Promise<WorkBook>;
export type writeXlsxFile = (workbook: WorkBook) => Uint8Array;
export type convertJsonData = (worksheet: WorkSheet) => unknown[];

// mapear lo necesario
export const readXlsx: readXlsxFile = async (data: ArrayBuffer) => {
  const workbook = read(data, { type: 'array' });
  return workbook;
};

export const writeXlsx: writeXlsxFile = (workbook: WorkBook) => {
  const binaryData = write(workbook, { type: 'array', bookType: 'xlsx' });

  return binaryData;
};

export const convertToJsonData: convertJsonData = (worksheet: WorkSheet) => {
  const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
  return jsonData;
};
