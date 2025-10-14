import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/employee-repository";
import { OutputFindAllEmployeeDto } from "./find-all.employee.dto";

export class EmployeeFindAllUseCase {

  private employeeRepository: EmployeeRepositoryInterface;

  constructor(employeeRepository: EmployeeRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  async execute(): Promise<OutputFindAllEmployeeDto> {
    const employees = await this.employeeRepository.findAll();

    return {
      employees: employees.map(employee => ({
        id: employee.id,
        name: employee.name,
        document: employee.document.getValue(),
        hiredAt: employee.hiredAt
      }))
    }
  }
}
