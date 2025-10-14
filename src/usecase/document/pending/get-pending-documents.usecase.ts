import { InputGetPendingDocumentsDto, OutputGetPendingDocumentsDto } from './get-pending-documents.dto';

export class GetPendingDocumentsUseCase {
  async execute(input: InputGetPendingDocumentsDto): Promise<OutputGetPendingDocumentsDto> {
    const page = input.page || 1;
    const limit = input.limit || 10;
    
    return {
      documents: [
        {
          id: 'doc-1',
          name: 'Documento CPF',
          status: 'PENDING',
          employeeId: 'emp-1',
          employeeName: 'João Silva',
          documentTypeId: 'doc-type-1',
          documentTypeName: 'CPF',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      pagination: {
        page,
        limit,
        total: 1,
        totalPages: 1
      }
    };
  }
}
