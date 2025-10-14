import { DocumentFindByIdUseCase } from "./find-by-id.document.usecase";
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

describe('Unit tests for document find by id use case', () => {

  it('should find a document by id', async () => {
    const documentRepository = MockRepository();
    const documentFindByIdUseCase = new DocumentFindByIdUseCase(documentRepository);

    const document = new Document({
      id: input.id,
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    });

    documentRepository.findById.mockResolvedValue(document);

    const output = await documentFindByIdUseCase.execute(input);
    
    expect(output).toEqual({
      id: input.id,
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    });

    expect(documentRepository.findById).toHaveBeenCalledWith(input.id);
  })

  it('should throw error when document not found', async () => {
    const documentRepository = MockRepository();
    const documentFindByIdUseCase = new DocumentFindByIdUseCase(documentRepository);

    documentRepository.findById.mockResolvedValue(null);

    await expect(documentFindByIdUseCase.execute(input)).rejects.toThrow('Documento não encontrado');
  })

})
