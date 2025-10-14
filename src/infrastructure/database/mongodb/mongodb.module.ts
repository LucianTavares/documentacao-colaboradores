import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, EmployeeSchemaFactory } from './schemas/employee.schema';
import { DocumentTypeSchema, DocumentTypeSchemaFactory } from './schemas/document-type.schema';
import { DocumentSchema, DocumentSchemaFactory } from './schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/desafio-inmeta'),
    MongooseModule.forFeature([
      { name: 'Employee', schema: EmployeeSchemaFactory },
      { name: 'DocumentType', schema: DocumentTypeSchemaFactory },
      { name: 'Document', schema: DocumentSchemaFactory },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: 'Employee', schema: EmployeeSchemaFactory },
      { name: 'DocumentType', schema: DocumentTypeSchemaFactory },
      { name: 'Document', schema: DocumentSchemaFactory },
    ]),
  ],
})
export class MongoDBModule {}
