import { COLORS } from '@domain/entities/excel_makro.entity';

export const findIndexOnMatrix = (Matrix: unknown[][], arrayToFind: string[]): number => {
  return Matrix.findIndex((innerArray) => {
    return innerArray.some((item) => arrayToFind.includes(item as string));
  });
};

export const getColorForNumber = (num: number) => {
  const index = (num - 1) % COLORS.length;
  return COLORS[index] || 'FFFFFF'; // Blanco por defecto
};
