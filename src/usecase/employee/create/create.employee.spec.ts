import { EmployeeCreateUseCase } from "./create.employee.usecase"

const input = {
  name: 'John Doe',
  document: '32833025025',
  hiredAt: new Date()
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

describe('Unit tests for employee create use case', () => {

  it('should create a employee', async () => {
    const employeeRepository = MockRepository();
    const employeeCreateUseCase  = new EmployeeCreateUseCase(employeeRepository);

    const output = await employeeCreateUseCase.execute(input);
    
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      document: input.document,
      hiredAt: input.hiredAt
    });
  })

  it('should throw an error when name is required', async () => {
    const employeeRepository = MockRepository();
    const employeeCreateUseCase  = new EmployeeCreateUseCase(employeeRepository);

    const invalidInput = {
      name: '',
      document: '32833025025',
      hiredAt: new Date()
    };
    
    await expect(employeeCreateUseCase.execute(invalidInput)).rejects.toThrow('Nome do colaborador é obrigatório');
  })

  it('should throw an error when document is required', async () => {
    const employeeRepository = MockRepository();
    const employeeCreateUseCase  = new EmployeeCreateUseCase(employeeRepository);

    const invalidInput = {
      name: 'John Doe',
      document: '',
      hiredAt: new Date()
    };
    
    await expect(employeeCreateUseCase.execute(invalidInput)).rejects.toThrow('CPF inválido');
  })
  
  it('should throw an error when hiredAt is required', async () => {
    const employeeRepository = MockRepository();
    const employeeCreateUseCase  = new EmployeeCreateUseCase(employeeRepository);

    const invalidInput = {
      name: 'John Doe',
      document: '32833025025',
      hiredAt: null as any
    };
    
    await expect(employeeCreateUseCase.execute(invalidInput)).rejects.toThrow('Data de contratação é obrigatória');
  })

})