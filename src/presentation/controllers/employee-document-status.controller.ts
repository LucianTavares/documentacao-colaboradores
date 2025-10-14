import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetEmployeeDocumentStatusUseCase } from '../../usecase/employee-document-status/get-employee-document-status.usecase';

@ApiTags('employee-document-status')
@Controller('employee-document-status')
export class EmployeeDocumentStatusController {
  constructor(
    private readonly getEmployeeDocumentStatusUseCase: GetEmployeeDocumentStatusUseCase
  ) {}

  @Get(':employeeId')
  @ApiOperation({ summary: 'Obter status da documentação de um colaborador' })
  @ApiParam({ name: 'employeeId', description: 'ID do colaborador' })
  @ApiResponse({ status: 200, description: 'Status da documentação obtido com sucesso' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado' })
  async getStatus(@Param('employeeId') employeeId: string) {
    return await this.getEmployeeDocumentStatusUseCase.execute({ employeeId });
  }
}
