import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EmployeeDocumentTypeSchema extends Document {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  documentTypeId: string;

  @Prop({ required: true, default: true })
  isRequired: boolean;
}

export const EmployeeDocumentTypeSchemaFactory = SchemaFactory.createForClass(EmployeeDocumentTypeSchema);
