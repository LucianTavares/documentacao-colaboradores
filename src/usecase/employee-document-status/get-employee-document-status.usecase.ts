import { InputGetEmployeeDocumentStatusDto, OutputGetEmployeeDocumentStatusDto } from './get-employee-document-status.dto';

export class GetEmployeeDocumentStatusUseCase {
  async execute(input: InputGetEmployeeDocumentStatusDto): Promise<OutputGetEmployeeDocumentStatusDto> {
    return {
      employeeId: input.employeeId,
      employeeName: 'João Silva',
      documents: [
        {
          documentTypeId: 'doc-type-1',
          documentTypeName: 'CPF',
          status: 'PENDING',
          isRequired: true
        },
        {
          documentTypeId: 'doc-type-2',
          documentTypeName: 'RG',
          status: 'SENT',
          isRequired: true,
          documentId: 'doc-1',
          sentAt: new Date()
        }
      ],
      summary: {
        total: 2,
        pending: 1,
        sent: 1,
        approved: 0,
        rejected: 0
      }
    };
  }
}
