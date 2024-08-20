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
    //** Read File */
    const workbook = await readXlsxFile(xlsxFile);

    //** Proccess */
    const workbookToExport = createWorkBook();

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = convertWorkSheetToJsonData(worksheet); //convertir la hoja a un array con los elementos internos
      const worksheetToExport = convertArrayToSheet(jsonData as unknown[][]);
      convertWorkSheetToWorkBook(workbookToExport, worksheetToExport, sheetName);
    });

    //** Return File */
    const stream = await writeXlsxFile(workbookToExport);

    return stream;
  };
  return execute;
};
