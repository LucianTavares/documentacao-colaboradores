import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputMarkAsRejectedDocumentDto, OutputMarkAsRejectedDocumentDto } from "./mark-as-rejected.document.dto";

export class DocumentMarkAsRejectedUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputMarkAsRejectedDocumentDto): Promise<OutputMarkAsRejectedDocumentDto> {
    const existingDocument = await this.documentRepository.findById(input.id);
    
    if (!existingDocument) {
      throw new Error('Documento não encontrado');
    }

    const updatedDocument = existingDocument.markAsRejected('Documento rejeitado por não atender aos requisitos');

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
