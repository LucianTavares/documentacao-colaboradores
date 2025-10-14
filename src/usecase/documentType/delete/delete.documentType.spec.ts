import { DocumentTypeDeleteUseCase } from "./delete.documentType.usecase";
import { DocumentType } from "../../../domain/documentType/entity/documentType.entity";

const input = {
  id: 'documentType-1'
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

describe('Unit tests for documentType delete use case', () => {

  it('should delete a documentType', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeDeleteUseCase = new DocumentTypeDeleteUseCase(documentTypeRepository);

    const existingDocumentType = new DocumentType({
      id: input.id,
      name: 'CPF'
    });

    documentTypeRepository.findById.mockResolvedValue(existingDocumentType);

    const output = await documentTypeDeleteUseCase.execute(input);
    
    expect(output).toEqual({
      message: 'Tipo de documento removido com sucesso'
    });

    expect(documentTypeRepository.findById).toHaveBeenCalledWith(input.id);
    expect(documentTypeRepository.delete).toHaveBeenCalledWith(input.id);
  })

  it('should throw error when documentType not found', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeDeleteUseCase = new DocumentTypeDeleteUseCase(documentTypeRepository);

    documentTypeRepository.findById.mockResolvedValue(null);

    await expect(documentTypeDeleteUseCase.execute(input)).rejects.toThrow('Tipo de documento não encontrado');
  })

})
