export interface InputGetEmployeeDocumentStatusDto {
  employeeId: string;
}

export interface OutputGetEmployeeDocumentStatusDto {
  employeeId: string;
  employeeName: string;
  documents: {
    documentTypeId: string;
    documentTypeName: string;
    status: string;
    isRequired: boolean;
    documentId?: string;
    sentAt?: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
    rejectionReason?: string;
  }[];
  summary: {
    total: number;
    pending: number;
    sent: number;
    approved: number;
    rejected: number;
  };
}
