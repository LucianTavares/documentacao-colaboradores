import { Document } from "../entity/document.entity";
import { v4 as uuidv4 } from "uuid";

export class DocumentFactory {
  public static create(
    name: string,
    status: string,
    employeeId: string,
    documentTypeId: string
  ): Document {
    return new Document({
      id: uuidv4(),
      name,
      status,
      employeeId,
      documentTypeId
    });
  }
}
