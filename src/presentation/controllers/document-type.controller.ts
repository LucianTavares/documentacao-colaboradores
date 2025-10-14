import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { DocumentTypeCreateUseCase } from '../../usecase/documentType/create/create.documentType.usecase';
import { DocumentTypeUpdateUseCase } from '../../usecase/documentType/update/update.documentType.usecase';
import { DocumentTypeDeleteUseCase } from '../../usecase/documentType/delete/delete.documentType.usecase';
import { DocumentTypeFindByIdUseCase } from '../../usecase/documentType/find-by-id/find-by-id.documentType.usecase';
import { DocumentTypeFindAllUseCase } from '../../usecase/documentType/find-all/find-all.documentType.usecase';
import { CreateDocumentTypeDto } from '../dtos/document-type/create-document-type.dto';
import { UpdateDocumentTypeDto } from '../dtos/document-type/update-document-type.dto';
import { DocumentTypeResponseDto } from '../dtos/document-type/document-type-response.dto';

@Controller('document-types')
export class DocumentTypeController {
  constructor(
    private readonly documentTypeCreateUseCase: DocumentTypeCreateUseCase,
    private readonly documentTypeUpdateUseCase: DocumentTypeUpdateUseCase,
    private readonly documentTypeDeleteUseCase: DocumentTypeDeleteUseCase,
    private readonly documentTypeFindByIdUseCase: DocumentTypeFindByIdUseCase,
    private readonly documentTypeFindAllUseCase: DocumentTypeFindAllUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDocumentTypeDto: CreateDocumentTypeDto): Promise<DocumentTypeResponseDto> {
    const result = await this.documentTypeCreateUseCase.execute({
      name: createDocumentTypeDto.name,
    });

    return {
      id: result.id,
      name: result.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Get()
  async findAll(): Promise<{ documentTypes: DocumentTypeResponseDto[] }> {
    const result = await this.documentTypeFindAllUseCase.execute();
    
    return {
      documentTypes: result.documentTypes.map(documentType => ({
        id: documentType.id,
        name: documentType.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DocumentTypeResponseDto> {
    const result = await this.documentTypeFindByIdUseCase.execute({ id });
    
    return {
      id: result.id,
      name: result.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
  ): Promise<DocumentTypeResponseDto> {
    const result = await this.documentTypeUpdateUseCase.execute({
      id,
      name: updateDocumentTypeDto.name,
    });

    return {
      id: result.id,
      name: result.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.documentTypeDeleteUseCase.execute({ id });
  }
}
