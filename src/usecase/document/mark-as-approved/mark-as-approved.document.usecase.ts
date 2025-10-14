import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputMarkAsApprovedDocumentDto, OutputMarkAsApprovedDocumentDto } from "./mark-as-approved.document.dto";

export class DocumentMarkAsApprovedUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputMarkAsApprovedDocumentDto): Promise<OutputMarkAsApprovedDocumentDto> {
    const existingDocument = await this.documentRepository.findById(input.id);
    
    if (!existingDocument) {
      throw new Error('Documento não encontrado');
    }

    const updatedDocument = existingDocument.markAsApproved();

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
