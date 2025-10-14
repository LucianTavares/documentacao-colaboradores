import { Entity } from '../../@shared/entity/entity.abstract';
import { IsString, IsNotEmpty, IsDateString, IsOptional, Length } from 'class-validator';
import { EmployeeValidatorFactory } from '../factory/employee.validator.factory';
import { CPF } from '../../@shared/value-objects/cpf.value-object';

export type EmployeeProps = {
  id: string;
  name: string;
  document: string | CPF;
  hiredAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Employee extends Entity {
  private _name: string;
  private _document: CPF;
  private _hiredAt: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: EmployeeProps) {
    super();
    this._id = props.id;
    this._name = props.name;
    this._document = props.document instanceof CPF ? props.document : new CPF(props.document);
    this._hiredAt = props.hiredAt;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this.validate();
  }

  validate(): void {
    EmployeeValidatorFactory.create().validate(this);
    
    if (this.notification.hasErrors()) {
      const errors = this.notification.getErrors();
      throw new Error(errors.map(error => error.message).join(', '));
    }
  }


  public updateName(name: string): Employee {
    if (!name || name.trim() === '') {
      throw new Error('Nome do colaborador é obrigatório');
    }

    return new Employee({
      id: this._id,
      name,
      document: this._document,
      hiredAt: this._hiredAt,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  get name(): string {
    return this._name;
  }

  get document(): CPF {
    return this._document;
  }

  get hiredAt(): Date {
    return this._hiredAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateDocument(document: string | CPF): Employee {
    const cpfDocument = document instanceof CPF ? document : new CPF(document);

    return new Employee({
      id: this._id,
      name: this._name,
      document: cpfDocument,
      hiredAt: this._hiredAt,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public updateHiredAt(hiredAt: Date): Employee {
    if (!hiredAt) {
      throw new Error('Data de contratação é obrigatória');
    }

    return new Employee({
      id: this._id,
      name: this._name,
      document: this._document,
      hiredAt,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }
}

