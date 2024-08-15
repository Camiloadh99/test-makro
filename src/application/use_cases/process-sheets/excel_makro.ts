import { convertJsonData, readXlsxFile, writeXlsxFile } from '@fnd/libs/process-xlsx';
import { utils } from 'xlsx';

type Dependencies = {
  readXlsxFile: readXlsxFile;
  writeXlsxFile: writeXlsxFile;
  convertToJsonData: convertJsonData;
};

export const build = ({ readXlsxFile, writeXlsxFile, convertToJsonData }: Dependencies) => {
  const execute = async (xlsxFile: Buffer) => {
    //** Read File */
    const workbook = await readXlsxFile(xlsxFile);

    //** Proccess */
    const workbookToExport = utils.book_new();

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = convertToJsonData(worksheet); //convertir la hoja a un array con los elementos internos
      const worksheetToExport = utils.aoa_to_sheet(jsonData as unknown[][]);
      utils.book_append_sheet(workbookToExport, worksheetToExport, sheetName);
    });

    //** Return File */
    const stream = await writeXlsxFile(workbookToExport);

    return stream;
  };
  return execute;
};
