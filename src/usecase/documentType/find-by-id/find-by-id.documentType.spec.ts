import { DocumentTypeFindByIdUseCase } from "./find-by-id.documentType.usecase";
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

describe('Unit tests for documentType find by id use case', () => {

  it('should find a documentType by id', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeFindByIdUseCase = new DocumentTypeFindByIdUseCase(documentTypeRepository);

    const documentType = new DocumentType({
      id: input.id,
      name: 'CPF'
    });

    documentTypeRepository.findById.mockResolvedValue(documentType);

    const output = await documentTypeFindByIdUseCase.execute(input);
    
    expect(output).toEqual({
      id: input.id,
      name: 'CPF'
    });

    expect(documentTypeRepository.findById).toHaveBeenCalledWith(input.id);
  })

  it('should throw error when documentType not found', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeFindByIdUseCase = new DocumentTypeFindByIdUseCase(documentTypeRepository);

    documentTypeRepository.findById.mockResolvedValue(null);

    await expect(documentTypeFindByIdUseCase.execute(input)).rejects.toThrow('Tipo de documento não encontrado');
  })

})
