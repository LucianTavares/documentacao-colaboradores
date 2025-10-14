import { DocumentRepositoryInterface } from "../../../domain/document/repository/document-interface";
import { InputDeleteDocumentDto, OutputDeleteDocumentDto } from "./delete.document.dto";

export class DocumentDeleteUseCase {

  private documentRepository: DocumentRepositoryInterface;

  constructor(documentRepository: DocumentRepositoryInterface) {
    this.documentRepository = documentRepository;
  }

  async execute(input: InputDeleteDocumentDto): Promise<OutputDeleteDocumentDto> {
    const existingDocument = await this.documentRepository.findById(input.id);
    
    if (!existingDocument) {
      throw new Error('Documento não encontrado');
    }

    await this.documentRepository.delete(input.id);

    return {
      message: 'Documento removido com sucesso'
    }
  }
}
