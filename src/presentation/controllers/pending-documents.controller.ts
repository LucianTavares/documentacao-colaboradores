import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetPendingDocumentsUseCase } from '../../usecase/document/pending/get-pending-documents.usecase';

@ApiTags('pending-documents')
@Controller('pending-documents')
export class PendingDocumentsController {
  constructor(
    private readonly getPendingDocumentsUseCase: GetPendingDocumentsUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar documentos pendentes com filtros e paginação' })
  @ApiQuery({ name: 'employeeId', required: false, description: 'Filtrar por colaborador' })
  @ApiQuery({ name: 'documentTypeId', required: false, description: 'Filtrar por tipo de documento' })
  @ApiQuery({ name: 'page', required: false, description: 'Página (padrão: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite por página (padrão: 10)' })
  @ApiResponse({ status: 200, description: 'Documentos pendentes listados com sucesso' })
  async getPendingDocuments(
    @Query('employeeId') employeeId?: string,
    @Query('documentTypeId') documentTypeId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return await this.getPendingDocumentsUseCase.execute({
      employeeId,
      documentTypeId,
      page,
      limit
    });
  }
}
