import { InputUnlinkEmployeeDocumentTypeDto, OutputUnlinkEmployeeDocumentTypeDto } from './unlink-employee-document-type.dto';
import { EmployeeDocumentTypeRepositoryInterface } from '../../../domain/employeeDocumentType/repository/employee-document-type-interface';

export class UnlinkEmployeeDocumentTypeUseCase {
  constructor(
    private readonly employeeDocumentTypeRepository: EmployeeDocumentTypeRepositoryInterface
  ) {}

  async execute(input: InputUnlinkEmployeeDocumentTypeDto): Promise<OutputUnlinkEmployeeDocumentTypeDto> {
    const existingLink = await this.employeeDocumentTypeRepository.findByEmployeeAndDocumentType(
      input.employeeId,
      input.documentTypeId
    );

    if (!existingLink) {
      throw new Error('Vinculação não encontrada');
    }

    await this.employeeDocumentTypeRepository.delete(existingLink.id);

    return {
      success: true,
      message: 'Colaborador desvinculado do tipo de documento com sucesso'
    };
  }
}
