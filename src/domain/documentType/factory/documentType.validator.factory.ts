import { DocumentType } from "../entity/documentType.entity";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { DocumentTypeYupValidator } from "../validator/documentType.yup.validator";

export class DocumentTypeValidatorFactory {
  static create(): ValidatorInterface<DocumentType> {
    return new DocumentTypeYupValidator();
  }
}