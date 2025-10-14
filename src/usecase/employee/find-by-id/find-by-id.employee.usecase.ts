import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/employee-repository";
import { InputFindByIdEmployeeDto, OutputFindByIdEmployeeDto } from "./find-by-id.employee.dto";

export class EmployeeFindByIdUseCase {

  private employeeRepository: EmployeeRepositoryInterface;

  constructor(employeeRepository: EmployeeRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  async execute(input: InputFindByIdEmployeeDto): Promise<OutputFindByIdEmployeeDto> {
    const employee = await this.employeeRepository.findById(input.id);
    
    if (!employee) {
      throw new Error('Colaborador não encontrado');
    }

    return {
      id: employee.id,
      name: employee.name,
      document: employee.document.getValue(),
      hiredAt: employee.hiredAt
    }
  }
}
