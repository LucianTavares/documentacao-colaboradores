import { DocumentUpdateUseCase } from "./update.document.usecase";
import { Document } from "../../../domain/document/entity/document.entity";

const input = {
  id: 'document-1',
  name: 'Documento RG',
  status: 'SENT',
  employeeId: 'employee-2',
  documentTypeId: 'documentType-2'
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

describe('Unit tests for document update use case', () => {

  it('should update a document', async () => {
    const documentRepository = MockRepository();
    const documentUpdateUseCase = new DocumentUpdateUseCase(documentRepository);

    const existingDocument = new Document({
      id: input.id,
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    });

    documentRepository.findById.mockResolvedValue(existingDocument);

    const output = await documentUpdateUseCase.execute(input);
    
    expect(output).toEqual({
      id: input.id,
      name: input.name,
      status: input.status,
      employeeId: input.employeeId,
      documentTypeId: input.documentTypeId
    });

    expect(documentRepository.findById).toHaveBeenCalledWith(input.id);
    expect(documentRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: input.id,
      name: input.name,
      status: expect.any(Object),
      employeeId: input.employeeId,
      documentTypeId: input.documentTypeId
    }));
  })

  it('should throw error when document not found', async () => {
    const documentRepository = MockRepository();
    const documentUpdateUseCase = new DocumentUpdateUseCase(documentRepository);

    documentRepository.findById.mockResolvedValue(null);

    await expect(documentUpdateUseCase.execute(input)).rejects.toThrow('Documento não encontrado');
  })

})
