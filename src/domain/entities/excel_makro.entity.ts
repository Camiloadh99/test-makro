interface ExcelMakro {
  id: number;
  name: string;
  description: string;
  code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface fileResponse {
  file: Uint8Array | null;
  errors: string[];
}

export const XLSX_CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const ALLOWED_MIMETYPES = Object.freeze([XLSX_CONTENT_TYPE]);

export const excelFieldsTitles = Object.freeze([
  'Pack RMS',
  'Sucursal',
  'Proveedor',
  'Departamento',
  'Código',
  'Descripcion',
  'Tipo Cliente',
  'KVI',
  'No Oferta',
  'Descripcion Brief',
  'Tipo Cliente Promoción',
  'Tipo de Oferta',
  'Nacional o Regional',
  1,
  2,
  3,
  4,
  5,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  'Excepciones / Comentarios',
  'Ctd Stock',
  'Valor Stock',
  'Mes N-3',
  'Mes N-2',
  'Mes N-1',
  'Prom Ctd',
  'Promedio Dias MM',
  'Unidades a Vender',
  'Evacuacion de Inventario (SI/NO)',
  '% Incremento Venta',
  'PVP Moda',
  'PVP Regular Sugerido',
  'PVP Regular con Descuento',
  'Descuento\r\nen Porcentaje %',
  'Escala',
  'Precio con Escala',
  'PVP Oferta',
  'Descuento',
  'Ahorro',
  'Estimado Venta',
  'Unidades Disponibles',
  'Q Maxima por Cliente'
]);

export const excelExportedTitles = Object.freeze([
  'Check Revision',
  'CÓD. Código / Unidades Disponibles UND*',
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

export const excelExportedTitlesColors = Object.freeze([
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

export const colors = Object.freeze([
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
