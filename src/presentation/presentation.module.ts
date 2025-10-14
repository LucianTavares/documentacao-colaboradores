import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { DocumentTypeController } from './controllers/document-type.controller';
import { DocumentController } from './controllers/document.controller';
import { EmployeeDocumentTypeController } from './controllers/employee-document-type.controller';
import { EmployeeDocumentStatusController } from './controllers/employee-document-status.controller';
import { PendingDocumentsController } from './controllers/pending-documents.controller';
import { EmployeeCreateUseCase } from '../usecase/employee/create/create.employee.usecase';
import { EmployeeUpdateUseCase } from '../usecase/employee/update/update.employee.usecase';
import { EmployeeDeleteUseCase } from '../usecase/employee/delete/delete.employee.usecase';
import { EmployeeFindByIdUseCase } from '../usecase/employee/find-by-id/find-by-id.employee.usecase';
import { EmployeeFindAllUseCase } from '../usecase/employee/find-all/find-all.employee.usecase';
import { DocumentTypeCreateUseCase } from '../usecase/documentType/create/create.documentType.usecase';
import { DocumentTypeUpdateUseCase } from '../usecase/documentType/update/update.documentType.usecase';
import { DocumentTypeDeleteUseCase } from '../usecase/documentType/delete/delete.documentType.usecase';
import { DocumentTypeFindByIdUseCase } from '../usecase/documentType/find-by-id/find-by-id.documentType.usecase';
import { DocumentTypeFindAllUseCase } from '../usecase/documentType/find-all/find-all.documentType.usecase';
import { DocumentCreateUseCase } from '../usecase/document/create/create.document.usecase';
import { DocumentUpdateUseCase } from '../usecase/document/update/update.document.usecase';
import { DocumentDeleteUseCase } from '../usecase/document/delete/delete.document.usecase';
import { DocumentFindByIdUseCase } from '../usecase/document/find-by-id/find-by-id.document.usecase';
import { DocumentFindAllUseCase } from '../usecase/document/find-all/find-all.document.usecase';
import { DocumentMarkAsSentUseCase } from '../usecase/document/mark-as-sent/mark-as-sent.document.usecase';
import { DocumentMarkAsApprovedUseCase } from '../usecase/document/mark-as-approved/mark-as-approved.document.usecase';
import { DocumentMarkAsRejectedUseCase } from '../usecase/document/mark-as-rejected/mark-as-rejected.document.usecase';
import { LinkEmployeeDocumentTypeUseCase } from '../usecase/employee-document-type/link/link-employee-document-type.usecase';
import { UnlinkEmployeeDocumentTypeUseCase } from '../usecase/employee-document-type/unlink/unlink-employee-document-type.usecase';
import { GetEmployeeDocumentStatusUseCase } from '../usecase/employee-document-status/get-employee-document-status.usecase';
import { GetPendingDocumentsUseCase } from '../usecase/document/pending/get-pending-documents.usecase';
import { EMPLOYEE_REPOSITORY, DOCUMENT_TYPE_REPOSITORY, DOCUMENT_REPOSITORY } from '../infrastructure/database/mongodb/tokens/repository.tokens';
import { RepositoriesModule } from '../infrastructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [
    EmployeeController,
    DocumentTypeController,
    DocumentController,
    EmployeeDocumentTypeController,
    EmployeeDocumentStatusController,
    PendingDocumentsController,
  ],
  providers: [
    EmployeeCreateUseCase,
    EmployeeUpdateUseCase,
    EmployeeDeleteUseCase,
    EmployeeFindByIdUseCase,
    EmployeeFindAllUseCase,
    DocumentTypeCreateUseCase,
    DocumentTypeUpdateUseCase,
    DocumentTypeDeleteUseCase,
    DocumentTypeFindByIdUseCase,
    DocumentTypeFindAllUseCase,
    DocumentCreateUseCase,
    DocumentUpdateUseCase,
    DocumentDeleteUseCase,
    DocumentFindByIdUseCase,
    DocumentFindAllUseCase,
    DocumentMarkAsSentUseCase,
    DocumentMarkAsApprovedUseCase,
    DocumentMarkAsRejectedUseCase,
    LinkEmployeeDocumentTypeUseCase,
    UnlinkEmployeeDocumentTypeUseCase,
    GetEmployeeDocumentStatusUseCase,
    GetPendingDocumentsUseCase,
    {
      provide: EmployeeCreateUseCase,
      useFactory: (employeeRepository) => {
        return new EmployeeCreateUseCase(employeeRepository);
      },
      inject: [EMPLOYEE_REPOSITORY],
    },
    {
      provide: EmployeeUpdateUseCase,
      useFactory: (employeeRepository) => {
        return new EmployeeUpdateUseCase(employeeRepository);
      },
      inject: [EMPLOYEE_REPOSITORY],
    },
    {
      provide: EmployeeDeleteUseCase,
      useFactory: (employeeRepository) => {
        return new EmployeeDeleteUseCase(employeeRepository);
      },
      inject: [EMPLOYEE_REPOSITORY],
    },
    {
      provide: EmployeeFindByIdUseCase,
      useFactory: (employeeRepository) => {
        return new EmployeeFindByIdUseCase(employeeRepository);
      },
      inject: [EMPLOYEE_REPOSITORY],
    },
    {
      provide: EmployeeFindAllUseCase,
      useFactory: (employeeRepository) => {
        return new EmployeeFindAllUseCase(employeeRepository);
      },
      inject: [EMPLOYEE_REPOSITORY],
    },
    {
      provide: DocumentTypeCreateUseCase,
      useFactory: (documentTypeRepository) => {
        return new DocumentTypeCreateUseCase(documentTypeRepository);
      },
      inject: [DOCUMENT_TYPE_REPOSITORY],
    },
    {
      provide: DocumentTypeUpdateUseCase,
      useFactory: (documentTypeRepository) => {
        return new DocumentTypeUpdateUseCase(documentTypeRepository);
      },
      inject: [DOCUMENT_TYPE_REPOSITORY],
    },
    {
      provide: DocumentTypeDeleteUseCase,
      useFactory: (documentTypeRepository) => {
        return new DocumentTypeDeleteUseCase(documentTypeRepository);
      },
      inject: [DOCUMENT_TYPE_REPOSITORY],
    },
    {
      provide: DocumentTypeFindByIdUseCase,
      useFactory: (documentTypeRepository) => {
        return new DocumentTypeFindByIdUseCase(documentTypeRepository);
      },
      inject: [DOCUMENT_TYPE_REPOSITORY],
    },
    {
      provide: DocumentTypeFindAllUseCase,
      useFactory: (documentTypeRepository) => {
        return new DocumentTypeFindAllUseCase(documentTypeRepository);
      },
      inject: [DOCUMENT_TYPE_REPOSITORY],
    },
    {
      provide: DocumentCreateUseCase,
      useFactory: (documentRepository) => {
        return new DocumentCreateUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentUpdateUseCase,
      useFactory: (documentRepository) => {
        return new DocumentUpdateUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentDeleteUseCase,
      useFactory: (documentRepository) => {
        return new DocumentDeleteUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentFindByIdUseCase,
      useFactory: (documentRepository) => {
        return new DocumentFindByIdUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentFindAllUseCase,
      useFactory: (documentRepository) => {
        return new DocumentFindAllUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentMarkAsSentUseCase,
      useFactory: (documentRepository) => {
        return new DocumentMarkAsSentUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentMarkAsApprovedUseCase,
      useFactory: (documentRepository) => {
        return new DocumentMarkAsApprovedUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
    {
      provide: DocumentMarkAsRejectedUseCase,
      useFactory: (documentRepository) => {
        return new DocumentMarkAsRejectedUseCase(documentRepository);
      },
      inject: [DOCUMENT_REPOSITORY],
    },
  ],
})
export class PresentationModule {}
