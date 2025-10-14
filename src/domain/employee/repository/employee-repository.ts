import { Employee } from "../entity/employee.entity";
import { RepositoryInterface } from "../../@shared/repository/repository-interface";

export interface EmployeeRepositoryInterface extends RepositoryInterface<Employee> {}