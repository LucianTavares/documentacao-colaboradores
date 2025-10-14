import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputMarkAsSentDocumentDto, OutputMarkAsSentDocumentDto } from "./mark-as-sent.document.dto";

export class DocumentMarkAsSentUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputMarkAsSentDocumentDto): Promise<OutputMarkAsSentDocumentDto> {
    const existingDocument = await this.documentRepository.findById(input.id);
    
    if (!existingDocument) {
      throw new Error('Documento não encontrado');
    }

    const updatedDocument = existingDocument.markAsSent();

    await this.documentRepository.update(updatedDocument);

    return {
      id: updatedDocument.id,
      name: updatedDocument.name,
      status: updatedDocument.status.getValue(),
      employeeId: updatedDocument.employeeId,
      documentTypeId: updatedDocument.documentTypeId
    }
  }
}
