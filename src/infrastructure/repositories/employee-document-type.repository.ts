import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDocumentType } from '../../domain/employeeDocumentType/entity/employee-document-type.entity';
import { EmployeeDocumentTypeRepositoryInterface } from '../../domain/employeeDocumentType/repository/employee-document-type-interface';
import { EmployeeDocumentTypeSchema } from '../database/mongodb/schemas/employee-document-type.schema';

@Injectable()
export class EmployeeDocumentTypeRepository implements EmployeeDocumentTypeRepositoryInterface {
  constructor(
    @InjectModel(EmployeeDocumentTypeSchema.name)
    private readonly employeeDocumentTypeModel: Model<EmployeeDocumentTypeSchema>
  ) {}

  async create(employeeDocumentType: EmployeeDocumentType): Promise<EmployeeDocumentType> {
    const created = new this.employeeDocumentTypeModel({
      _id: employeeDocumentType.id,
      employeeId: employeeDocumentType.employeeId,
      documentTypeId: employeeDocumentType.documentTypeId,
      isRequired: employeeDocumentType.isRequired
    });

    const saved = await created.save();
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<EmployeeDocumentType | null> {
    const found = await this.employeeDocumentTypeModel.findById(id).exec();
    return found ? this.toDomain(found) : null;
  }

  async findByEmployeeId(employeeId: string): Promise<EmployeeDocumentType[]> {
    const found = await this.employeeDocumentTypeModel.find({ employeeId }).exec();
    return found.map(item => this.toDomain(item));
  }

  async findByDocumentTypeId(documentTypeId: string): Promise<EmployeeDocumentType[]> {
    const found = await this.employeeDocumentTypeModel.find({ documentTypeId }).exec();
    return found.map(item => this.toDomain(item));
  }

  async findByEmployeeAndDocumentType(employeeId: string, documentTypeId: string): Promise<EmployeeDocumentType | null> {
    const found = await this.employeeDocumentTypeModel.findOne({ employeeId, documentTypeId }).exec();
    return found ? this.toDomain(found) : null;
  }

  async update(employeeDocumentType: EmployeeDocumentType): Promise<EmployeeDocumentType> {
    const updated = await this.employeeDocumentTypeModel.findByIdAndUpdate(
      employeeDocumentType.id,
      {
        employeeId: employeeDocumentType.employeeId,
        documentTypeId: employeeDocumentType.documentTypeId,
        isRequired: employeeDocumentType.isRequired
      },
      { new: true }
    ).exec();

    if (!updated) {
      throw new Error('EmployeeDocumentType not found');
    }

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.employeeDocumentTypeModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<EmployeeDocumentType[]> {
    const found = await this.employeeDocumentTypeModel.find().exec();
    return found.map(item => this.toDomain(item));
  }

  private toDomain(schema: any): EmployeeDocumentType {
    return new EmployeeDocumentType({
      id: schema._id.toString(),
      employeeId: schema.employeeId,
      documentTypeId: schema.documentTypeId,
      isRequired: schema.isRequired,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    });
  }
}
