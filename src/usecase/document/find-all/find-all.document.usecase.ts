import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { OutputFindAllDocumentDto } from "./find-all.document.dto";

export class DocumentFindAllUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(): Promise<OutputFindAllDocumentDto> {
    const documents = await this.documentRepository.findAll();

    return {
      documents: documents.map(document => ({
        id: document.id,
        name: document.name,
        status: document.status.getValue(),
        employeeId: document.employeeId,
        documentTypeId: document.documentTypeId
      }))
    }
  }
}
