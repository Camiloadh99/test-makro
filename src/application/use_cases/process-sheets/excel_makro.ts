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
  convertToJsonData: convertJsonData;
  convertArrayToSheet: arrayToSheetFile;
  convertToWorkBook: convertToWorkBookFile;
  createWorkBook: createWorkBookFile;
};

export const build = ({
  readXlsxFile,
  writeXlsxFile,
  convertToJsonData,
  convertArrayToSheet,
  convertToWorkBook,
  createWorkBook
}: Dependencies) => {
  const execute = async (xlsxFile: Buffer) => {
    //** Read File */
    const workbook = await readXlsxFile(xlsxFile);

    //** Proccess */
    const workbookToExport = createWorkBook();

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = convertToJsonData(worksheet); //convertir la hoja a un array con los elementos internos
      const worksheetToExport = convertArrayToSheet(jsonData as unknown[][]);
      convertToWorkBook(workbookToExport, worksheetToExport, sheetName);
    });

    //** Return File */
    const stream = await writeXlsxFile(workbookToExport);

    return stream;
  };
  return execute;
};
