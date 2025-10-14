import { DocumentTypeRepositoryInterface } from "../../../domain/documentType/repository/documentType-interface";
import { InputFindByIdDocumentTypeDto, OutputFindByIdDocumentTypeDto } from "./find-by-id.documentType.dto";

export class DocumentTypeFindByIdUseCase {

  private documentTypeRepository: DocumentTypeRepositoryInterface;

  constructor(documentTypeRepository: DocumentTypeRepositoryInterface) {
    this.documentTypeRepository = documentTypeRepository;
  }

  async execute(input: InputFindByIdDocumentTypeDto): Promise<OutputFindByIdDocumentTypeDto> {
    const documentType = await this.documentTypeRepository.findById(input.id);
    
    if (!documentType) {
      throw new Error('Tipo de documento não encontrado');
    }

    return {
      id: documentType.id,
      name: documentType.name
    }
  }
}
