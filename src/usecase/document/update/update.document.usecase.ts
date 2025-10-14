import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputUpdateDocumentDto, OutputUpdateDocumentDto } from "./update.document.dto";

export class DocumentUpdateUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputUpdateDocumentDto): Promise<OutputUpdateDocumentDto> {
    const existingDocument = await this.documentRepository.findById(input.id);
    
    if (!existingDocument) {
      throw new Error('Documento não encontrado');
    }

    let updatedDocument = existingDocument;

    if (input.name !== undefined) {
      updatedDocument = updatedDocument.updateName(input.name);
    }

    if (input.status !== undefined) {
      updatedDocument = updatedDocument.updateStatus(input.status);
    }

    if (input.employeeId !== undefined) {
      updatedDocument = updatedDocument.updateEmployeeId(input.employeeId);
    }

    if (input.documentTypeId !== undefined) {
      updatedDocument = updatedDocument.updateDocumentTypeId(input.documentTypeId);
    }

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
