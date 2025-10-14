import { EmployeeUpdateUseCase } from "./update.employee.usecase";
import { Employee } from "../../../domain/employee/entity/employee.entity";

const input = {
  id: 'employee-1',
  name: 'Jane Doe',
  document: '11144477735',
  hiredAt: new Date('2023-01-01')
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

describe('Unit tests for employee update use case', () => {

  it('should update a employee', async () => {
    const employeeRepository = MockRepository();
    const employeeUpdateUseCase = new EmployeeUpdateUseCase(employeeRepository);

    const existingEmployee = new Employee({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    employeeRepository.findById.mockResolvedValue(existingEmployee);

    const output = await employeeUpdateUseCase.execute(input);
    
    expect(output).toEqual({
      id: input.id,
      name: input.name,
      document: input.document,
      hiredAt: input.hiredAt
    });

    expect(employeeRepository.findById).toHaveBeenCalledWith(input.id);
    expect(employeeRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: input.id,
      name: input.name,
      document: expect.any(Object),
      hiredAt: input.hiredAt
    }));
  })

  it('should throw error when employee not found', async () => {
    const employeeRepository = MockRepository();
    const employeeUpdateUseCase = new EmployeeUpdateUseCase(employeeRepository);

    employeeRepository.findById.mockResolvedValue(null);

    await expect(employeeUpdateUseCase.execute(input)).rejects.toThrow('Colaborador não encontrado');
  })

  it('should update only name when provided', async () => {
    const employeeRepository = MockRepository();
    const employeeUpdateUseCase = new EmployeeUpdateUseCase(employeeRepository);

    const existingEmployee = new Employee({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    employeeRepository.findById.mockResolvedValue(existingEmployee);

    const updateInput = {
      id: input.id,
      name: 'Jane Doe'
    };

    const output = await employeeUpdateUseCase.execute(updateInput);
    
    expect(output.name).toBe('Jane Doe');
    expect(output.document).toBe('32833025025');
    expect(output.hiredAt).toEqual(new Date('2022-01-01'));
  })

  it('should update only document when provided', async () => {
    const employeeRepository = MockRepository();
    const employeeUpdateUseCase = new EmployeeUpdateUseCase(employeeRepository);

    const existingEmployee = new Employee({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    employeeRepository.findById.mockResolvedValue(existingEmployee);

    const updateInput = {
      id: input.id,
      document: '11144477735'
    };

    const output = await employeeUpdateUseCase.execute(updateInput);
    
    expect(output.name).toBe('John Doe');
    expect(output.document).toBe('11144477735');
    expect(output.hiredAt).toEqual(new Date('2022-01-01'));
  })

  it('should update only hiredAt when provided', async () => {
    const employeeRepository = MockRepository();
    const employeeUpdateUseCase = new EmployeeUpdateUseCase(employeeRepository);

    const existingEmployee = new Employee({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    employeeRepository.findById.mockResolvedValue(existingEmployee);

    const updateInput = {
      id: input.id,
      hiredAt: new Date('2023-01-01')
    };

    const output = await employeeUpdateUseCase.execute(updateInput);
    
    expect(output.name).toBe('John Doe');
    expect(output.document).toBe('32833025025');
    expect(output.hiredAt).toEqual(new Date('2023-01-01'));
  })

})
