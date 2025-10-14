import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { DocumentType } from "../entity/documentType.entity";
import * as yup from 'yup';

export class DocumentTypeYupValidator implements ValidatorInterface<DocumentType> {

  validate(entity: DocumentType): void {

    try {
      yup
        .object()
        .shape({
          id: yup.string().required('ID do tipo de documento é obrigatório'),
          name: yup.string().required('Nome do tipo de documento é obrigatório'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const e = error as yup.ValidationError
      e.inner.forEach((error) => {
        entity.notification.addErrors({
          context: "documentType",
          message: error.message
        })
      });
    }
  }
}