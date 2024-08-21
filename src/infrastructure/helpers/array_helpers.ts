export const findIndexOfArrayOfArrayByString = (arrayOfArrays: unknown[][], searchString: string): number => {
  return arrayOfArrays.findIndex((innerArray) => innerArray.some((item) => item === searchString));
};
