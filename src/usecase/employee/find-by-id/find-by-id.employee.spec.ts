import { EmployeeFindByIdUseCase } from "./find-by-id.employee.usecase";
import { Employee } from "../../../domain/employee/entity/employee.entity";

const input = {
  id: 'employee-1'
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

describe('Unit tests for employee find by id use case', () => {

  it('should find a employee by id', async () => {
    const employeeRepository = MockRepository();
    const employeeFindByIdUseCase = new EmployeeFindByIdUseCase(employeeRepository);

    const employee = new Employee({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    employeeRepository.findById.mockResolvedValue(employee);

    const output = await employeeFindByIdUseCase.execute(input);
    
    expect(output).toEqual({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    expect(employeeRepository.findById).toHaveBeenCalledWith(input.id);
  })

  it('should throw error when employee not found', async () => {
    const employeeRepository = MockRepository();
    const employeeFindByIdUseCase = new EmployeeFindByIdUseCase(employeeRepository);

    employeeRepository.findById.mockResolvedValue(null);

    await expect(employeeFindByIdUseCase.execute(input)).rejects.toThrow('Colaborador não encontrado');
  })

})
