import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DocumentSchema extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, enum: ['PENDING', 'SENT', 'APPROVED', 'REJECTED'] })
  status: string;

  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  documentTypeId: string;

  @Prop({ type: Date })
  sentAt: Date;

  @Prop({ type: Date })
  approvedAt: Date;

  @Prop({ type: Date })
  rejectedAt: Date;

  @Prop({ trim: true })
  rejectionReason: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DocumentSchemaFactory = SchemaFactory.createForClass(DocumentSchema);
