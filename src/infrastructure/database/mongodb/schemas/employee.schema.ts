import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EmployeeSchema extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  document: string;

  @Prop({ required: true })
  hiredAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const EmployeeSchemaFactory = SchemaFactory.createForClass(EmployeeSchema);
