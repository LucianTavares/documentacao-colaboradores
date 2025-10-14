import { EmployeeRepositoryInterface } from "../../../domain/employee/repository/employee-repository";
import { InputDeleteEmployeeDto, OutputDeleteEmployeeDto } from "./delete.employee.dto";

export class EmployeeDeleteUseCase {

  private employeeRepository: EmployeeRepositoryInterface;

  constructor(employeeRepository: EmployeeRepositoryInterface) {
    this.employeeRepository = employeeRepository;
  }

  async execute(input: InputDeleteEmployeeDto): Promise<OutputDeleteEmployeeDto> {
    const existingEmployee = await this.employeeRepository.findById(input.id);
    
    if (!existingEmployee) {
      throw new Error('Colaborador não encontrado');
    }

    await this.employeeRepository.delete(input.id);

    return {
      message: 'Colaborador removido com sucesso'
    }
  }
}
