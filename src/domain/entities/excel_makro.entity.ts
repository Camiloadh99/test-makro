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

export const excelFieldsTitles = [
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
];

export const excelExportedTitles = [
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
];
