export interface OutputFindAllDocumentDto {
  documents: {
    id: string;
    name: string;
    status: string;
    employeeId: string;
    documentTypeId: string;
  }[];
}
