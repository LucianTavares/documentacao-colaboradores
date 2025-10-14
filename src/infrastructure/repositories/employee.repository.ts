import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../domain/employee/entity/employee.entity';
import { EmployeeRepositoryInterface } from '../../domain/employee/repository/employee-repository';
import { EmployeeSchema } from '../database/mongodb/schemas/employee.schema';

@Injectable()
export class EmployeeRepository implements EmployeeRepositoryInterface {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<EmployeeSchema>,
  ) {}

  async create(employee: Employee): Promise<void> {
    const employeeData = {
      id: employee.id,
      name: employee.name,
      document: employee.document.getValue(),
      hiredAt: employee.hiredAt,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };

    await this.employeeModel.create(employeeData);
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.employeeModel.find().exec();
    return employees.map(this.toDomain);
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findOne({ id }).exec();
    return employee ? this.toDomain(employee) : null;
  }

  async update(employee: Employee): Promise<void> {
    const employeeData = {
      name: employee.name,
      document: employee.document.getValue(),
      hiredAt: employee.hiredAt,
      updatedAt: employee.updatedAt,
    };

    await this.employeeModel.updateOne({ id: employee.id }, employeeData);
  }

  async delete(id: string): Promise<void> {
    await this.employeeModel.deleteOne({ id });
  }

  private toDomain(employeeData: any): Employee {
    return new Employee({
      id: employeeData.id,
      name: employeeData.name,
      document: employeeData.document,
      hiredAt: employeeData.hiredAt,
      createdAt: employeeData.createdAt,
      updatedAt: employeeData.updatedAt,
    });
  }
}
