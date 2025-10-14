import { DocumentCreateUseCase } from "./create.document.usecase"

const input = {
  name: 'Documento CPF',
  status: 'PENDING',
  employeeId: 'employee-1',
  documentTypeId: 'documentType-1'
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

describe('Unit tests for document create use case', () => {

  it('should create a document', async () => {
    const documentRepository = MockRepository();
    const documentCreateUseCase  = new DocumentCreateUseCase(documentRepository);

    const output = await documentCreateUseCase.execute(input);
    
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      status: input.status,
      employeeId: input.employeeId,
      documentTypeId: input.documentTypeId
    });

    expect(documentRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(String),
      name: input.name,
      status: expect.any(Object),
      employeeId: input.employeeId,
      documentTypeId: input.documentTypeId
    }));
  })

  it('should throw an error when name is required', async () => {
    const documentRepository = MockRepository();
    const documentCreateUseCase  = new DocumentCreateUseCase(documentRepository);

    const invalidInput = {
      name: '',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    };
    
    await expect(documentCreateUseCase.execute(invalidInput)).rejects.toThrow('Nome do documento é obrigatório');
  })

  it('should throw an error when status is invalid', async () => {
    const documentRepository = MockRepository();
    const documentCreateUseCase  = new DocumentCreateUseCase(documentRepository);

    const invalidInput = {
      name: 'Documento CPF',
      status: 'INVALID',
      employeeId: 'employee-1',
      documentTypeId: 'documentType-1'
    };
    
    await expect(documentCreateUseCase.execute(invalidInput)).rejects.toThrow('Status do documento deve ser PENDING, SENT, APPROVED ou REJECTED');
  })

  it('should throw an error when employeeId is required', async () => {
    const documentRepository = MockRepository();
    const documentCreateUseCase  = new DocumentCreateUseCase(documentRepository);

    const invalidInput = {
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: '',
      documentTypeId: 'documentType-1'
    };
    
    await expect(documentCreateUseCase.execute(invalidInput)).rejects.toThrow('ID do colaborador é obrigatório');
  })

  it('should throw an error when documentTypeId is required', async () => {
    const documentRepository = MockRepository();
    const documentCreateUseCase  = new DocumentCreateUseCase(documentRepository);

    const invalidInput = {
      name: 'Documento CPF',
      status: 'PENDING',
      employeeId: 'employee-1',
      documentTypeId: ''
    };
    
    await expect(documentCreateUseCase.execute(invalidInput)).rejects.toThrow('ID do tipo de documento é obrigatório');
  })

})
