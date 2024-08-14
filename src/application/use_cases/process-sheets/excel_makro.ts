import { readXlsxFile, writeXlsxFile } from '@fnd/libs/process-xlsx';

type Dependencies = {
  readXlsxFile: readXlsxFile;
  writeXlsxFile: writeXlsxFile<any>;
};

export const build = ({ readXlsxFile, writeXlsxFile }: Dependencies) => {
  const execute = () => {
    const rows = readXlsxFile('path/to/file.xlsx');
    // lógica de makro
    // Archivo procesado
    // Filas resultantes
    const finalRows = [''];
    // Escritura del archivo
    return writeXlsxFile('path/to/file.xlsx', finalRows);
  };
  return execute;
};
