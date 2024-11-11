export type DocumentType = 'passport' | 'license';

export interface DocumentField {
  key: string;
  value: string;
}

export interface DocumentData {
  fields: DocumentField[];
  documentType: DocumentType;
  scanDate: string;
}