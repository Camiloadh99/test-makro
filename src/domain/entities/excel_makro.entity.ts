interface ExcelMakro {
  id: number;
  name: string;
  description: string;
  code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export const XLSX_CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const ALLOWED_MIMETYPES = Object.freeze([XLSX_CONTENT_TYPE]);
