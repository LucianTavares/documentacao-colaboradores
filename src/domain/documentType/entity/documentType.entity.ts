import { Entity } from "../../@shared/entity/entity.abstract";
import { DocumentTypeValidatorFactory } from "../factory/documentType.validator.factory";

export type DocumentTypeProps = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DocumentType extends Entity {

  private _name: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: DocumentTypeProps) {
    super();
    this._id = props.id;
    this._name = props.name;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
  
  validate(): void {
    DocumentTypeValidatorFactory.create().validate(this);
    
    if (this.notification.hasErrors()) {
      const errors = this.notification.getErrors();
      throw new Error(errors.map(error => error.message).join(', '));
    }
  }

  public updateName(name: string): DocumentType {
    if (!name || name.trim() === '') {
      throw new Error('Nome do tipo de documento é obrigatório');
    }
    
    return new DocumentType({
      id: this._id,
      name,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }
}