import { InputLinkEmployeeDocumentTypeDto, OutputLinkEmployeeDocumentTypeDto } from './link-employee-document-type.dto';
import { EmployeeDocumentTypeFactory } from '../../../domain/employeeDocumentType/factory/employee-document-type.factory';
import { EmployeeDocumentTypeRepositoryInterface } from '../../../domain/employeeDocumentType/repository/employee-document-type-interface';

export class LinkEmployeeDocumentTypeUseCase {
  constructor(
    private readonly employeeDocumentTypeRepository: EmployeeDocumentTypeRepositoryInterface
  ) {}

  async execute(input: InputLinkEmployeeDocumentTypeDto): Promise<OutputLinkEmployeeDocumentTypeDto> {
    const existingLink = await this.employeeDocumentTypeRepository.findByEmployeeAndDocumentType(
      input.employeeId,
      input.documentTypeId
    );

    if (existingLink) {
      throw new Error('Colaborador já está vinculado a este tipo de documento');
    }

    const employeeDocumentType = EmployeeDocumentTypeFactory.create(
      input.employeeId,
      input.documentTypeId,
      input.isRequired ?? true
    );

    const savedEmployeeDocumentType = await this.employeeDocumentTypeRepository.create(employeeDocumentType);

    return {
      id: savedEmployeeDocumentType.id,
      employeeId: savedEmployeeDocumentType.employeeId,
      documentTypeId: savedEmployeeDocumentType.documentTypeId,
      isRequired: savedEmployeeDocumentType.isRequired,
      createdAt: savedEmployeeDocumentType.createdAt,
      updatedAt: savedEmployeeDocumentType.updatedAt
    };
  }
}
