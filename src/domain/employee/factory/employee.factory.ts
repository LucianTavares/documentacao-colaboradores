import { Employee } from "../entity/employee.entity";
import { v4 as uuid } from 'uuid';

export class EmployeeFactory {

  public static create(name: string, document: string, hiredAt: Date): Employee {
    return new Employee({
      id: uuid(),
      name,
      document,
      hiredAt
    });
  }
}