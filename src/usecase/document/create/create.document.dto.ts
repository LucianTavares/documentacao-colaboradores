export interface InputCreateDocumentDto {
  name: string;
  status: string;
  employeeId: string;
  documentTypeId: string;
}

export interface OutputCreateDocumentDto {
  id: string;
  name: string;
  status: string;
  employeeId: string;
  documentTypeId: string;
}
