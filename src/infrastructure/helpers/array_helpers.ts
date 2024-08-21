import { colors } from '@domain/entities/excel_makro.entity';

export const findIndexOfArrayOfArrayByString = (arrayOfArrays: unknown[][], searchString: string): number => {
  return arrayOfArrays.findIndex((innerArray) => innerArray.some((item) => item === searchString));
};

export const getColorForNumber = (num: number) => {
  return colors[num] || 'FFFFFF'; // Blanco por defecto
};
