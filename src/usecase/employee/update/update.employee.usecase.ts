import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/employee-repository";
import { InputUpdateEmployeeDto, OutputUpdateEmployeeDto } from "./update.employee.dto";

export class EmployeeUpdateUseCase {

  private employeeRepository: EmployeeRepositoryInterface;

  constructor(employeeRepository: EmployeeRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  async execute(input: InputUpdateEmployeeDto): Promise<OutputUpdateEmployeeDto> {
    const existingEmployee = await this.employeeRepository.findById(input.id);
    
    if (!existingEmployee) {
      throw new Error('Colaborador não encontrado');
    }

    let updatedEmployee = existingEmployee;

    if (input.name !== undefined) {
      updatedEmployee = updatedEmployee.updateName(input.name);
    }

    if (input.document !== undefined) {
      updatedEmployee = updatedEmployee.updateDocument(input.document);
    }

    if (input.hiredAt !== undefined) {
      updatedEmployee = updatedEmployee.updateHiredAt(input.hiredAt);
    }

    await this.employeeRepository.update(updatedEmployee);

    return {
      id: updatedEmployee.id,
      name: updatedEmployee.name,
      document: updatedEmployee.document.getValue(),
      hiredAt: updatedEmployee.hiredAt
    }
  }
}
