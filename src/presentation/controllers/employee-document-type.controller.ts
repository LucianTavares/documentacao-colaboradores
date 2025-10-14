import { Controller, Post, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LinkEmployeeDocumentTypeUseCase } from '../../usecase/employee-document-type/link/link-employee-document-type.usecase';
import { UnlinkEmployeeDocumentTypeUseCase } from '../../usecase/employee-document-type/unlink/unlink-employee-document-type.usecase';

@ApiTags('employee-document-types')
@Controller('employee-document-types')
export class EmployeeDocumentTypeController {
  constructor(
    private readonly linkEmployeeDocumentTypeUseCase: LinkEmployeeDocumentTypeUseCase,
    private readonly unlinkEmployeeDocumentTypeUseCase: UnlinkEmployeeDocumentTypeUseCase
  ) {}

  @Post('link')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Vincular colaborador a tipo de documento' })
  @ApiResponse({ status: 201, description: 'Vinculação criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async link(
    @Body() body: { employeeId: string; documentTypeId: string; isRequired?: boolean }
  ) {
    return await this.linkEmployeeDocumentTypeUseCase.execute(body);
  }

  @Delete('unlink')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desvincular colaborador de tipo de documento' })
  @ApiResponse({ status: 200, description: 'Desvinculação realizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Vinculação não encontrada' })
  async unlink(
    @Body() body: { employeeId: string; documentTypeId: string }
  ) {
    return await this.unlinkEmployeeDocumentTypeUseCase.execute(body);
  }
}
