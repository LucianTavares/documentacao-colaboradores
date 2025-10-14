export interface InputGetPendingDocumentsDto {
  employeeId?: string;
  documentTypeId?: string;
  page?: number;
  limit?: number;
}

export interface OutputGetPendingDocumentsDto {
  documents: {
    id: string;
    name: string;
    status: string;
    employeeId: string;
    employeeName: string;
    documentTypeId: string;
    documentTypeName: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
