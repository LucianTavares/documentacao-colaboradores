import { EmployeeDeleteUseCase } from "./delete.employee.usecase";
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

describe('Unit tests for employee delete use case', () => {

  it('should delete a employee', async () => {
    const employeeRepository = MockRepository();
    const employeeDeleteUseCase = new EmployeeDeleteUseCase(employeeRepository);

    const existingEmployee = new Employee({
      id: input.id,
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date('2022-01-01')
    });

    employeeRepository.findById.mockResolvedValue(existingEmployee);

    const output = await employeeDeleteUseCase.execute(input);
    
    expect(output).toEqual({
      message: 'Colaborador removido com sucesso'
    });

    expect(employeeRepository.findById).toHaveBeenCalledWith(input.id);
    expect(employeeRepository.delete).toHaveBeenCalledWith(input.id);
  })

  it('should throw error when employee not found', async () => {
    const employeeRepository = MockRepository();
    const employeeDeleteUseCase = new EmployeeDeleteUseCase(employeeRepository);

    employeeRepository.findById.mockResolvedValue(null);

    await expect(employeeDeleteUseCase.execute(input)).rejects.toThrow('Colaborador não encontrado');
  })

})
