export interface InputUnlinkEmployeeDocumentTypeDto {
  employeeId: string;
  documentTypeId: string;
}

export interface OutputUnlinkEmployeeDocumentTypeDto {
  success: boolean;
  message: string;
}
