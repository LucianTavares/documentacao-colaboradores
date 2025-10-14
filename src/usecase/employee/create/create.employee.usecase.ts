import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/employee-repository";
import { InputCreateEmployeeDto, OutputCreateEmployeeDto } from "./create.employee.dto";
import { EmployeeFactory } from "../../../domain/employee/factory/employee.factory";

export class EmployeeCreateUseCase {

  private employeeRepository: EmployeeRepositoryInterface;

  constructor(employeeRepository: EmployeeRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  async execute(input: InputCreateEmployeeDto): Promise<OutputCreateEmployeeDto> {
    const employee = EmployeeFactory.create(input.name, input.document, input.hiredAt);
    
    await this.employeeRepository.create(employee);

    return {
      id: employee.id,
      name: employee.name,
      document: employee.document.getValue(),
      hiredAt: employee.hiredAt
    }
  }
}