import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Employee } from "../entity/employee.entity";
import * as yup from 'yup';

export class EmployeeYupValidator implements ValidatorInterface<Employee> {

  validate(entity: Employee): void {

    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID do colaborador é obrigatório'),
          name: yup.string().required('Nome do colaborador é obrigatório'),
          document: yup.string().required('CPF do colaborador é obrigatório'),
          hiredAt: yup.date().required('Data de contratação é obrigatória'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            document: entity.document,
            hiredAt: entity.hiredAt,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const e = error as yup.ValidationError
      e.inner.forEach((error) => {
        entity.notification.addErrors({
          context: "employee",
          message: error.message
        })
      });
    }
  }
}