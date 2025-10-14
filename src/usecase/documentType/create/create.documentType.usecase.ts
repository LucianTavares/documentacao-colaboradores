import { DocumentTypeRepositoryInterface } from "../../../domain/documentType/repository/documentType-interface";
import { InputCreateDocumentTypeDto, OutputCreateDocumentTypeDto } from "./create.documentType.dto";
import { DocumentTypeFactory } from "../../../domain/documentType/factory/documentType.factory";

export class DocumentTypeCreateUseCase {

  private documentTypeRepository: DocumentTypeRepositoryInterface;

  constructor(documentTypeRepository: DocumentTypeRepositoryInterface) {
    this.documentTypeRepository = documentTypeRepository;
  }

  async execute(input: InputCreateDocumentTypeDto): Promise<OutputCreateDocumentTypeDto> {
    const documentType = DocumentTypeFactory.create(input.name);
    
    await this.documentTypeRepository.create(documentType);

    return {
      id: documentType.id,
      name: documentType.name
    }
  }
}
