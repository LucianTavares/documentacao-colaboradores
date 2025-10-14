export interface InputUpdateDocumentDto {
  id: string;
  name?: string;
  status?: string;
  employeeId?: string;
  documentTypeId?: string;
}

export interface OutputUpdateDocumentDto {
  id: string;
  name: string;
  status: string;
  employeeId: string;
  documentTypeId: string;
}
