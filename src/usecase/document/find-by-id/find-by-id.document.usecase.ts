import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputFindByIdDocumentDto, OutputFindByIdDocumentDto } from "./find-by-id.document.dto";

export class DocumentFindByIdUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputFindByIdDocumentDto): Promise<OutputFindByIdDocumentDto> {
    const document = await this.documentRepository.findById(input.id);
    
    if (!document) {
      throw new Error('Documento não encontrado');
    }

    return {
      id: document.id,
      name: document.name,
      status: document.status.getValue(),
      employeeId: document.employeeId,
      documentTypeId: document.documentTypeId
    }
  }
}
