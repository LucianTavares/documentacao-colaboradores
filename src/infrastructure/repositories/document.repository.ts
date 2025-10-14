import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from '../../domain/document/entity/document.entity';
import { DocumentRepositoryInterface } from '../../domain/document/repository/document-interface';
import { DocumentSchema } from '../database/mongodb/schemas/document.schema';

@Injectable()
export class DocumentRepository implements DocumentRepositoryInterface {
  constructor(
    @InjectModel('Document') private documentModel: Model<DocumentSchema>,
  ) {}

  async create(document: Document): Promise<void> {
    const documentData = {
      id: document.id,
      name: document.name,
      status: document.status.getValue(),
      employeeId: document.employeeId,
      documentTypeId: document.documentTypeId,
      sentAt: document.sentAt,
      approvedAt: document.approvedAt,
      rejectedAt: document.rejectedAt,
      rejectionReason: document.rejectionReason,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    await this.documentModel.create(documentData);
  }

  async findAll(): Promise<Document[]> {
    const documents = await this.documentModel.find().exec();
    return documents.map(this.toDomain);
  }

  async findById(id: string): Promise<Document> {
    const document = await this.documentModel.findOne({ id }).exec();
    return document ? this.toDomain(document) : null;
  }

  async update(document: Document): Promise<void> {
    const documentData = {
      name: document.name,
      status: document.status.getValue(),
      employeeId: document.employeeId,
      documentTypeId: document.documentTypeId,
      sentAt: document.sentAt,
      approvedAt: document.approvedAt,
      rejectedAt: document.rejectedAt,
      rejectionReason: document.rejectionReason,
      updatedAt: document.updatedAt,
    };

    await this.documentModel.updateOne({ id: document.id }, documentData);
  }

  async delete(id: string): Promise<void> {
    await this.documentModel.deleteOne({ id });
  }

  private toDomain(documentData: any): Document {
    return new Document({
      id: documentData.id,
      name: documentData.name,
      status: documentData.status,
      employeeId: documentData.employeeId,
      documentTypeId: documentData.documentTypeId,
      sentAt: documentData.sentAt,
      approvedAt: documentData.approvedAt,
      rejectedAt: documentData.rejectedAt,
      rejectionReason: documentData.rejectionReason,
      createdAt: documentData.createdAt,
      updatedAt: documentData.updatedAt,
    });
  }
}
