import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Document } from "../entity/document.entity";
import { DocumentYupValidator } from "../validator/document.yup.validator";

export class DocumentValidatorFactory {
  static create(): ValidatorInterface<Document> {
    return new DocumentYupValidator();
  }
}
