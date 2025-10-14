import { DocumentTypeRepositoryInterface } from "../../../domain/documentType/repository/documentType-interface";
import { InputUpdateDocumentTypeDto, OutputUpdateDocumentTypeDto } from "./update.documentType.dto";

export class DocumentTypeUpdateUseCase {

  private documentTypeRepository: DocumentTypeRepositoryInterface;

  constructor(documentTypeRepository: DocumentTypeRepositoryInterface) {
    this.documentTypeRepository = documentTypeRepository;
  }

  async execute(input: InputUpdateDocumentTypeDto): Promise<OutputUpdateDocumentTypeDto> {
    const existingDocumentType = await this.documentTypeRepository.findById(input.id);
    
    if (!existingDocumentType) {
      throw new Error('Tipo de documento não encontrado');
    }

    let updatedDocumentType = existingDocumentType;

    if (input.name !== undefined) {
      updatedDocumentType = updatedDocumentType.updateName(input.name);
    }

    await this.documentTypeRepository.update(updatedDocumentType);

    return {
      id: updatedDocumentType.id,
      name: updatedDocumentType.name
    }
  }
}
