import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { DocumentCreateUseCase } from '../../usecase/document/create/create.document.usecase';
import { DocumentUpdateUseCase } from '../../usecase/document/update/update.document.usecase';
import { DocumentDeleteUseCase } from '../../usecase/document/delete/delete.document.usecase';
import { DocumentFindByIdUseCase } from '../../usecase/document/find-by-id/find-by-id.document.usecase';
import { DocumentFindAllUseCase } from '../../usecase/document/find-all/find-all.document.usecase';
import { DocumentMarkAsSentUseCase } from '../../usecase/document/mark-as-sent/mark-as-sent.document.usecase';
import { DocumentMarkAsApprovedUseCase } from '../../usecase/document/mark-as-approved/mark-as-approved.document.usecase';
import { DocumentMarkAsRejectedUseCase } from '../../usecase/document/mark-as-rejected/mark-as-rejected.document.usecase';
import { CreateDocumentDto } from '../dtos/document/create-document.dto';
import { UpdateDocumentDto } from '../dtos/document/update-document.dto';
import { DocumentResponseDto } from '../dtos/document/document-response.dto';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly documentCreateUseCase: DocumentCreateUseCase,
    private readonly documentUpdateUseCase: DocumentUpdateUseCase,
    private readonly documentDeleteUseCase: DocumentDeleteUseCase,
    private readonly documentFindByIdUseCase: DocumentFindByIdUseCase,
    private readonly documentFindAllUseCase: DocumentFindAllUseCase,
    private readonly documentMarkAsSentUseCase: DocumentMarkAsSentUseCase,
    private readonly documentMarkAsApprovedUseCase: DocumentMarkAsApprovedUseCase,
    private readonly documentMarkAsRejectedUseCase: DocumentMarkAsRejectedUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDocumentDto: CreateDocumentDto): Promise<DocumentResponseDto> {
    const result = await this.documentCreateUseCase.execute({
      name: createDocumentDto.name,
      status: createDocumentDto.status,
      employeeId: createDocumentDto.employeeId,
      documentTypeId: createDocumentDto.documentTypeId,
    });

    return {
      id: result.id,
      name: result.name,
      status: result.status,
      employeeId: result.employeeId,
      documentTypeId: result.documentTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Get()
  async findAll(): Promise<{ documents: DocumentResponseDto[] }> {
    const result = await this.documentFindAllUseCase.execute();
    
    return {
      documents: result.documents.map(document => ({
        id: document.id,
        name: document.name,
        status: document.status,
        employeeId: document.employeeId,
        documentTypeId: document.documentTypeId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DocumentResponseDto> {
    const result = await this.documentFindByIdUseCase.execute({ id });
    
    return {
      id: result.id,
      name: result.name,
      status: result.status,
      employeeId: result.employeeId,
      documentTypeId: result.documentTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentResponseDto> {
    const result = await this.documentUpdateUseCase.execute({
      id,
      name: updateDocumentDto.name,
      status: updateDocumentDto.status,
      employeeId: updateDocumentDto.employeeId,
      documentTypeId: updateDocumentDto.documentTypeId,
    });

    return {
      id: result.id,
      name: result.name,
      status: result.status,
      employeeId: result.employeeId,
      documentTypeId: result.documentTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.documentDeleteUseCase.execute({ id });
  }

  @Patch(':id/mark-as-sent')
  async markAsSent(@Param('id') id: string): Promise<DocumentResponseDto> {
    const result = await this.documentMarkAsSentUseCase.execute({ id });
    
    return {
      id: result.id,
      name: result.name,
      status: result.status,
      employeeId: result.employeeId,
      documentTypeId: result.documentTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Patch(':id/mark-as-approved')
  async markAsApproved(@Param('id') id: string): Promise<DocumentResponseDto> {
    const result = await this.documentMarkAsApprovedUseCase.execute({ id });
    
    return {
      id: result.id,
      name: result.name,
      status: result.status,
      employeeId: result.employeeId,
      documentTypeId: result.documentTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Patch(':id/mark-as-rejected')
  async markAsRejected(@Param('id') id: string): Promise<DocumentResponseDto> {
    const result = await this.documentMarkAsRejectedUseCase.execute({ id });
    
    return {
      id: result.id,
      name: result.name,
      status: result.status,
      employeeId: result.employeeId,
      documentTypeId: result.documentTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
