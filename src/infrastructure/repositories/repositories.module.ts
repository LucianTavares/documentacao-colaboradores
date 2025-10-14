import { Module } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { DocumentTypeRepository } from './document-type.repository';
import { DocumentRepository } from './document.repository';
import { EMPLOYEE_REPOSITORY, DOCUMENT_TYPE_REPOSITORY, DOCUMENT_REPOSITORY } from '../database/mongodb/tokens/repository.tokens';
import { MongoDBModule } from '../database/mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
  providers: [
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: EmployeeRepository,
    },
    {
      provide: DOCUMENT_TYPE_REPOSITORY,
      useClass: DocumentTypeRepository,
    },
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: DocumentRepository,
    },
  ],
  exports: [
    EMPLOYEE_REPOSITORY,
    DOCUMENT_TYPE_REPOSITORY,
    DOCUMENT_REPOSITORY,
  ],
})
export class RepositoriesModule {}
