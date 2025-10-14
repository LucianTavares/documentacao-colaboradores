import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Employee } from "../entity/employee.entity";
import { EmployeeYupValidator } from "../validator/employee.yup.validator";

export class EmployeeValidatorFactory {
  static create(): ValidatorInterface<Employee> {
    return new EmployeeYupValidator();
  }
}