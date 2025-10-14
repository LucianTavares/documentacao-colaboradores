import { EmployeeDocumentType } from '../entity/employee-document-type.entity';
import { v4 as uuidv4 } from 'uuid';

export class EmployeeDocumentTypeFactory {
  public static create(
    employeeId: string,
    documentTypeId: string,
    isRequired: boolean = true
  ): EmployeeDocumentType {
    return new EmployeeDocumentType({
      id: uuidv4(),
      employeeId,
      documentTypeId,
      isRequired,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
