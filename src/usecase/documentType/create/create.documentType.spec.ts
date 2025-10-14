import { DocumentTypeCreateUseCase } from "./create.documentType.usecase"

const input = {
  name: 'CPF'
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

describe('Unit tests for documentType create use case', () => {

  it('should create a documentType', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeCreateUseCase  = new DocumentTypeCreateUseCase(documentTypeRepository);

    const output = await documentTypeCreateUseCase.execute(input);
    
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name
    });

    expect(documentTypeRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(String),
      name: input.name
    }));
  })

  it('should throw an error when name is required', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeCreateUseCase  = new DocumentTypeCreateUseCase(documentTypeRepository);

    const invalidInput = {
      name: ''
    };
    
    await expect(documentTypeCreateUseCase.execute(invalidInput)).rejects.toThrow('Nome do tipo de documento é obrigatório');
  })

})
