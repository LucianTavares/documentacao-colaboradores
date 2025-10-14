import { DocumentTypeRepositoryInterface } from "../../../domain/documentType/repository/documentType-interface";
import { InputDeleteDocumentTypeDto, OutputDeleteDocumentTypeDto } from "./delete.documentType.dto";

export class DocumentTypeDeleteUseCase {

  private documentTypeRepository: DocumentTypeRepositoryInterface;

  constructor(documentTypeRepository: DocumentTypeRepositoryInterface) {
    this.documentTypeRepository = documentTypeRepository;
  }

  async execute(input: InputDeleteDocumentTypeDto): Promise<OutputDeleteDocumentTypeDto> {
    const existingDocumentType = await this.documentTypeRepository.findById(input.id);
    
    if (!existingDocumentType) {
      throw new Error('Tipo de documento não encontrado');
    }

    await this.documentTypeRepository.delete(input.id);

    return {
      message: 'Tipo de documento removido com sucesso'
    }
  }
}
