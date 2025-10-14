import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputCreateDocumentDto, OutputCreateDocumentDto } from "./create.document.dto";
import { DocumentFactory } from "../../../domain/document/factory/document.factory";

export class DocumentCreateUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputCreateDocumentDto): Promise<OutputCreateDocumentDto> {
    const document = DocumentFactory.create(input.name, input.status, input.employeeId, input.documentTypeId);
    
    await this.documentRepository.create(document);

    return {
      id: document.id,
      name: document.name,
      status: document.status.getValue(),
      employeeId: document.employeeId,
      documentTypeId: document.documentTypeId
    }
  }
}
