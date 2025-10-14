import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentType } from '../../domain/documentType/entity/documentType.entity';
import { DocumentTypeRepositoryInterface } from '../../domain/documentType/repository/documentType-interface';
import { DocumentTypeSchema } from '../database/mongodb/schemas/document-type.schema';

@Injectable()
export class DocumentTypeRepository implements DocumentTypeRepositoryInterface {
  constructor(
    @InjectModel('DocumentType') private documentTypeModel: Model<DocumentTypeSchema>,
  ) {}

  async create(documentType: DocumentType): Promise<void> {
    const documentTypeData = {
      id: documentType.id,
      name: documentType.name,
      createdAt: documentType.createdAt,
      updatedAt: documentType.updatedAt,
    };

    await this.documentTypeModel.create(documentTypeData);
  }

  async findAll(): Promise<DocumentType[]> {
    const documentTypes = await this.documentTypeModel.find().exec();
    return documentTypes.map(this.toDomain);
  }

  async findById(id: string): Promise<DocumentType> {
    const documentType = await this.documentTypeModel.findOne({ id }).exec();
    return documentType ? this.toDomain(documentType) : null;
  }

  async update(documentType: DocumentType): Promise<void> {
    const documentTypeData = {
      name: documentType.name,
      updatedAt: documentType.updatedAt,
    };

    await this.documentTypeModel.updateOne({ id: documentType.id }, documentTypeData);
  }

  async delete(id: string): Promise<void> {
    await this.documentTypeModel.deleteOne({ id });
  }

  private toDomain(documentTypeData: any): DocumentType {
    return new DocumentType({
      id: documentTypeData.id,
      name: documentTypeData.name,
      createdAt: documentTypeData.createdAt,
      updatedAt: documentTypeData.updatedAt,
    });
  }
}
