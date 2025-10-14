import { EmployeeDocumentType } from '../entity/employee-document-type.entity';

export interface EmployeeDocumentTypeRepositoryInterface {
  create(employeeDocumentType: EmployeeDocumentType): Promise<EmployeeDocumentType>;
  findById(id: string): Promise<EmployeeDocumentType | null>;
  findByEmployeeId(employeeId: string): Promise<EmployeeDocumentType[]>;
  findByDocumentTypeId(documentTypeId: string): Promise<EmployeeDocumentType[]>;
  findByEmployeeAndDocumentType(employeeId: string, documentTypeId: string): Promise<EmployeeDocumentType | null>;
  update(employeeDocumentType: EmployeeDocumentType): Promise<EmployeeDocumentType>;
  delete(id: string): Promise<void>;
  findAll(): Promise<EmployeeDocumentType[]>;
}
