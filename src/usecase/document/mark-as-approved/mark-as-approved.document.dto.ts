export interface InputMarkAsApprovedDocumentDto {
  id: string;
}

export interface OutputMarkAsApprovedDocumentDto {
  id: string;
  name: string;
  status: string;
  employeeId: string;
  documentTypeId: string;
}
