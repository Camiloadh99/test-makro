import { COLORS } from '@domain/entities/excel_makro.entity';
import { RowData } from '@fnd/libs/process-xlsx';

export const findIndexOnMatrix = (matrix: RowData[][], arrayToFind: string[]): number => {
  return matrix.findIndex((innerArray) => {
    return innerArray.some((item) => arrayToFind.includes(`${item}`));
  });
};

export const convertRowDataToStringArray = (rowData: RowData[]): string[] => {
  if (!rowData) return [];
  return Object.values(rowData).map((value) => `${value}`);
};

export const convertRowDataToNumberArray = (rowData: RowData[]): number[] => {
  if (!rowData) return [];
  return Object.values(rowData).map((value) => Number(value));
};
export const getColorForNumber = (num: number) => {
  const index = (num - 1) % COLORS.length;
  return COLORS[index] || 'FFFFFF'; // Blanco por defecto
};
