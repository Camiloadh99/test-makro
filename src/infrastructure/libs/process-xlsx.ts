import { readFile, writeFile } from 'xlsx';

export type readXlsxFile = (buffer: string) => Promise<any[]>;
export type writeXlsxFile<T> = (buffer: string, rows: T[]) => void;

// mapear lo necesario
export const readXlsx: readXlsxFile = async (path: string) => {
  try {
    // const rows = await readFile(path);
    // return rows;
    const a: string[] = [''];
    return a;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const writeXlsx: writeXlsxFile<any> = (path: string, rows: any[]) => {
  try {
    //writeFile(ws);
  } catch (error) {
    console.error(error);
  }
};
