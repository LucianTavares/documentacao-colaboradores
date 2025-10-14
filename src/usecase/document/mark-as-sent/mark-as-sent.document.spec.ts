import { DocumentMarkAsSentUseCase } from "./mark-as-sent.document.usecase";
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

describe('Unit tests for document mark as sent use case', () => {

  it('should mark document as sent', async () => {
    const documentRepository = MockRepository();
    const documentMarkAsSentUseCase = new DocumentMarkAsSentUseCase(documentRepository);

    const existingDocument = new Document({
      id: input.id,
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    });

    documentRepository.findById.mockResolvedValue(existingDocument);

    const output = await documentMarkAsSentUseCase.execute(input);
    
    expect(output.status).toBe('SENT');
    expect(documentRepository.findById).toHaveBeenCalledWith(input.id);
    expect(documentRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: input.id,
      status: expect.any(Object)
    }));
  })

  it('should throw error when document not found', async () => {
    const documentRepository = MockRepository();
    const documentMarkAsSentUseCase = new DocumentMarkAsSentUseCase(documentRepository);

    documentRepository.findById.mockResolvedValue(null);

    await expect(documentMarkAsSentUseCase.execute(input)).rejects.toThrow('Documento não encontrado');
  })

})
