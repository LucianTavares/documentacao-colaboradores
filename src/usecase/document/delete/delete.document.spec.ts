import { DocumentDeleteUseCase } from "./delete.document.usecase";
import { Document } from "../../../domain/document/entity/document.entity";

const input = {
  id: 'document-1'
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}

describe('Unit tests for document delete use case', () => {

  it('should delete a document', async () => {
    const documentRepository = MockRepository();
    const documentDeleteUseCase = new DocumentDeleteUseCase(documentRepository);

    const existingDocument = new Document({
      id: input.id,
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    });

    documentRepository.findById.mockResolvedValue(existingDocument);

    const output = await documentDeleteUseCase.execute(input);
    
    expect(output).toEqual({
      message: 'Documento removido com sucesso'
    });

    expect(documentRepository.findById).toHaveBeenCalledWith(input.id);
    expect(documentRepository.delete).toHaveBeenCalledWith(input.id);
  })

  it('should throw error when document not found', async () => {
    const documentRepository = MockRepository();
    const documentDeleteUseCase = new DocumentDeleteUseCase(documentRepository);

    documentRepository.findById.mockResolvedValue(null);

    await expect(documentDeleteUseCase.execute(input)).rejects.toThrow('Documento não encontrado');
  })

})
