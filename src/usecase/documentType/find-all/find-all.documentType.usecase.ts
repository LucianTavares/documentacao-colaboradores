import { DocumentTypeRepositoryInterface } from "../../../domain/documentType/repository/documentType-interface";
import { OutputFindAllDocumentTypeDto } from "./find-all.documentType.dto";

export class DocumentTypeFindAllUseCase {

  private documentTypeRepository: DocumentTypeRepositoryInterface;

  constructor(documentTypeRepository: DocumentTypeRepositoryInterface) {
    this.documentTypeRepository = documentTypeRepository;
  }

  async execute(): Promise<OutputFindAllDocumentTypeDto> {
    const documentTypes = await this.documentTypeRepository.findAll();

    return {
      documentTypes: documentTypes.map(documentType => ({
        id: documentType.id,
        name: documentType.name
      }))
    }
  }
}
