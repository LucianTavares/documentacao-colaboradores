import { DocumentType } from "../entity/documentType.entity";
import { v4 as uuid } from 'uuid';

export class DocumentTypeFactory {

  public static create(name: string): DocumentType {
    return new DocumentType({
      id: uuid(),
      name
    });
  }
}