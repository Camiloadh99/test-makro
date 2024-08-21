import { colors } from '@domain/entities/excel_makro.entity';

export const findIndexOfArrayOfArrayByString = (arrayOfArrays: unknown[][], searchString: string): number => {
  return arrayOfArrays.findIndex((innerArray) => {
    return innerArray.some((item) => item === searchString);
  });
};

export const getColorForNumber = (num: number) => {
  const index = (num - 1) % colors.length;
  return colors[index] || 'FFFFFF'; // Blanco por defecto
};
