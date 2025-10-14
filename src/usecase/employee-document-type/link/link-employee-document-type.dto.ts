export interface InputLinkEmployeeDocumentTypeDto {
  employeeId: string;
  documentTypeId: string;
  isRequired?: boolean;
}

export interface OutputLinkEmployeeDocumentTypeDto {
  id: string;
  employeeId: string;
  documentTypeId: string;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
