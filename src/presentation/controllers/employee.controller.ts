import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EmployeeCreateUseCase } from '../../usecase/employee/create/create.employee.usecase';
import { EmployeeUpdateUseCase } from '../../usecase/employee/update/update.employee.usecase';
import { EmployeeDeleteUseCase } from '../../usecase/employee/delete/delete.employee.usecase';
import { EmployeeFindByIdUseCase } from '../../usecase/employee/find-by-id/find-by-id.employee.usecase';
import { EmployeeFindAllUseCase } from '../../usecase/employee/find-all/find-all.employee.usecase';
import { CreateEmployeeDto } from '../dtos/employee/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/employee/update-employee.dto';
import { EmployeeResponseDto } from '../dtos/employee/employee-response.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeCreateUseCase: EmployeeCreateUseCase,
    private readonly employeeUpdateUseCase: EmployeeUpdateUseCase,
    private readonly employeeDeleteUseCase: EmployeeDeleteUseCase,
    private readonly employeeFindByIdUseCase: EmployeeFindByIdUseCase,
    private readonly employeeFindAllUseCase: EmployeeFindAllUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo colaborador' })
  @ApiResponse({ status: 201, description: 'Colaborador criado com sucesso', type: EmployeeResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const result = await this.employeeCreateUseCase.execute({
      name: createEmployeeDto.name,
      document: createEmployeeDto.document,
      hiredAt: new Date(createEmployeeDto.hiredAt),
    });

    return {
      id: result.id,
      name: result.name,
      document: result.document,
      hiredAt: result.hiredAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Get()
  async findAll(): Promise<{ employees: EmployeeResponseDto[] }> {
    const result = await this.employeeFindAllUseCase.execute();
    
    return {
      employees: result.employees.map(employee => ({
        id: employee.id,
        name: employee.name,
        document: employee.document,
        hiredAt: employee.hiredAt,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<EmployeeResponseDto> {
    const result = await this.employeeFindByIdUseCase.execute({ id });
    
    return {
      id: result.id,
      name: result.name,
      document: result.document,
      hiredAt: result.hiredAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    const result = await this.employeeUpdateUseCase.execute({
      id,
      name: updateEmployeeDto.name,
      document: updateEmployeeDto.document,
      hiredAt: updateEmployeeDto.hiredAt ? new Date(updateEmployeeDto.hiredAt) : undefined,
    });

    return {
      id: result.id,
      name: result.name,
      document: result.document,
      hiredAt: result.hiredAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.employeeDeleteUseCase.execute({ id });
  }
}
