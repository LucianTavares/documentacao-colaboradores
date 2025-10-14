import { Entity } from '../../@shared/entity/entity.abstract';

export type EmployeeDocumentTypeProps = {
  id: string;
  employeeId: string;
  documentTypeId: string;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class EmployeeDocumentType extends Entity {
  private _employeeId: string;
  private _documentTypeId: string;
  private _isRequired: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: EmployeeDocumentTypeProps) {
    super();
    this._id = props.id;
    this._employeeId = props.employeeId;
    this._documentTypeId = props.documentTypeId;
    this._isRequired = props.isRequired;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get employeeId(): string {
    return this._employeeId;
  }

  get documentTypeId(): string {
    return this._documentTypeId;
  }

  get isRequired(): boolean {
    return this._isRequired;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateIsRequired(isRequired: boolean): EmployeeDocumentType {
    return new EmployeeDocumentType({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId: this._documentTypeId,
      isRequired,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }
}
