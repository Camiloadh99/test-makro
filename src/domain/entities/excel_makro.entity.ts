export interface fileResponse {
  file: Uint8Array | null;
  errors: string[];
}

export const XLSX_CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const ALLOWED_MIMETYPES = Object.freeze([XLSX_CONTENT_TYPE]);

export const REQUIRED_FIELDS = Object.freeze([
  'Departamento',
  'Código',
  'Descripcion',
  'Tipo Cliente',
  'Tipo Cliente Promoción',
  'No Oferta',
  'Descripcion Brief',
  'Excepciones / Comentarios',
  'PVP Regular Sugerido',
  'PVP Regular con Descuento',
  'Descuento\r\nen Porcentaje %',
  'Escala',
  'Unidades Disponibles',
  'Q Maxima por Cliente'
]);

export const EXCEL_EXPORTED_TITLES = Object.freeze(['Check Revision', 'CÓD. Código / Unidades Disponibles UND*', ...REQUIRED_FIELDS]);

export const EXCEL_EXPORTED_TITLE_COLORS = Object.freeze([
  '999999',
  '375623',
  '375623',
  'c00000',
  '375623',
  '375623',
  'c00000',
  'c00000',
  'c00000',
  'c00000',
  'c00000',
  'c00000',
  'c00000',
  'c00000',
  'c00000',
  'c00000'
]);

export const COLORS = Object.freeze([
  'fbf8cc',
  'fde4cf',
  'ffcfd2',
  'f1c0e8',
  'cfbaf0',
  'a3c4f3',
  '90dbf4',
  '98f5e1',
  'b9fbc0',
  'fec5bb',
  'fcd5ce',
  'f8edeb',
  'd8e2dc',
  'ece4db',
  'ffe5d9',
  'ffd7ba',
  'fec89a',
  '4897ad',
  'e4e4e7',
  'ffffff',
  'fd4c31',
  '2f7f8e',
  '579fb2',
  '85acb1',
  'b3b4b1',
  'd1d1d6',
  'ccb05f'
]);
