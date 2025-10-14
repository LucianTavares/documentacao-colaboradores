import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Document } from "../entity/document.entity";
import * as yup from 'yup';

export class DocumentYupValidator implements ValidatorInterface<Document> {

  validate(entity: Document): void {

    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID do documento é obrigatório'),
          employeeId: yup.string().required('ID do colaborador é obrigatório'),
          documentTypeId: yup.string().required('ID do tipo de documento é obrigatório'),
          name: yup.string().required('Nome do documento é obrigatório'),
          status: yup.string().oneOf(['PENDING', 'SENT', 'APPROVED', 'REJECTED'], 'Status do documento deve ser PENDING, SENT, APPROVED ou REJECTED').required('Status do documento é obrigatório'),
        })
        .validateSync(
          {
            id: entity.id,
            employeeId: entity.employeeId,
            documentTypeId: entity.documentTypeId,
            name: entity.name,
            status: entity.status,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const e = error as yup.ValidationError
      e.inner.forEach((error) => {
        entity.notification.addErrors({
          context: "document",
          message: error.message
        })
      });
    }
  }
}
