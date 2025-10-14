export interface InputMarkAsRejectedDocumentDto {
  id: string;
}

export interface OutputMarkAsRejectedDocumentDto {
  id: string;
  name: string;
  status: string;
  employeeId: string;
  documentTypeId: string;
}
