import { EmployeeFindAllUseCase } from "./find-all.employee.usecase";
import { Employee } from "../../../domain/employee/entity/employee.entity";

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}

describe('Unit tests for employee find all use case', () => {

  it('should find all employees', async () => {
    const employeeRepository = MockRepository();
    const employeeFindAllUseCase = new EmployeeFindAllUseCase(employeeRepository);

    const employees = [
      new Employee({
        id: 'employee-1',
        name: 'John Doe',
        document: '32833025025',
        hiredAt: new Date('2022-01-01')
      }),
      new Employee({
        id: 'employee-2',
        name: 'Jane Doe',
        document: '11144477735',
        hiredAt: new Date('2022-02-01')
      })
    ];

    employeeRepository.findAll.mockResolvedValue(employees);

    const output = await employeeFindAllUseCase.execute();
    
    expect(output).toEqual({
      employees: [
        {
          id: 'employee-1',
          name: 'John Doe',
          document: '32833025025',
          hiredAt: new Date('2022-01-01')
        },
        {
          id: 'employee-2',
          name: 'Jane Doe',
          document: '11144477735',
          hiredAt: new Date('2022-02-01')
        }
      ]
    });

    expect(employeeRepository.findAll).toHaveBeenCalled();
  })

  it('should return empty array when no employees found', async () => {
    const employeeRepository = MockRepository();
    const employeeFindAllUseCase = new EmployeeFindAllUseCase(employeeRepository);

    employeeRepository.findAll.mockResolvedValue([]);

    const output = await employeeFindAllUseCase.execute();
    
    expect(output).toEqual({
      employees: []
    });

    expect(employeeRepository.findAll).toHaveBeenCalled();
  })

})
