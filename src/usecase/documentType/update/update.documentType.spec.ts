import { DocumentTypeUpdateUseCase } from "./update.documentType.usecase";
import { DocumentType } from "../../../domain/documentType/entity/documentType.entity";

const input = {
  id: 'documentType-1',
  name: 'RG'
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

describe('Unit tests for documentType update use case', () => {

  it('should update a documentType', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeUpdateUseCase = new DocumentTypeUpdateUseCase(documentTypeRepository);

    const existingDocumentType = new DocumentType({
      id: input.id,
      name: 'CPF'
    });

    documentTypeRepository.findById.mockResolvedValue(existingDocumentType);

    const output = await documentTypeUpdateUseCase.execute(input);
    
    expect(output).toEqual({
      id: input.id,
      name: input.name
    });

    expect(documentTypeRepository.findById).toHaveBeenCalledWith(input.id);
    expect(documentTypeRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: input.id,
      name: input.name
    }));
  })

  it('should throw error when documentType not found', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeUpdateUseCase = new DocumentTypeUpdateUseCase(documentTypeRepository);

    documentTypeRepository.findById.mockResolvedValue(null);

    await expect(documentTypeUpdateUseCase.execute(input)).rejects.toThrow('Tipo de documento não encontrado');
  })

})
