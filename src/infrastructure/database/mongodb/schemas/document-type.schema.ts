import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DocumentTypeSchema extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DocumentTypeSchemaFactory = SchemaFactory.createForClass(DocumentTypeSchema);
