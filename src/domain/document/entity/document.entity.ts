import { Entity } from '../../@shared/entity/entity.abstract';
import { DocumentValidatorFactory } from '../factory/document.validator.factory';
import { DocumentStatus } from '../../@shared/value-objects/document-status.value-object';

export type DocumentProps = {
  id: string;
  employeeId: string;
  documentTypeId: string;
  name: string;
  status: DocumentStatus | string;
  sentAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Document extends Entity {
  private _employeeId: string;
  private _documentTypeId: string;
  private _name: string;
  private _status: DocumentStatus;
  private _sentAt?: Date;
  private _approvedAt?: Date;
  private _rejectedAt?: Date;
  private _rejectionReason?: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: DocumentProps) {
    super();
    this._id = props.id;
    this._employeeId = props.employeeId;
    this._documentTypeId = props.documentTypeId;
    this._name = props.name;
    this._status = props.status instanceof DocumentStatus ? props.status : new DocumentStatus(props.status);
    this._sentAt = props.sentAt;
    this._approvedAt = props.approvedAt;
    this._rejectedAt = props.rejectedAt;
    this._rejectionReason = props.rejectionReason;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this.validate();
  }

  validate(): void {
    DocumentValidatorFactory.create().validate(this);
    
    if (this.notification.hasErrors()) {
      const errors = this.notification.getErrors();
      throw new Error(errors.map(error => error.message).join(', '));
    }
  }

  get employeeId(): string {
    return this._employeeId;
  }

  get documentTypeId(): string {
    return this._documentTypeId;
  }

  get name(): string {
    return this._name;
  }

  get status(): DocumentStatus {
    return this._status;
  }

  get sentAt(): Date | undefined {
    return this._sentAt;
  }

  get approvedAt(): Date | undefined {
    return this._approvedAt;
  }

  get rejectedAt(): Date | undefined {
    return this._rejectedAt;
  }

  get rejectionReason(): string | undefined {
    return this._rejectionReason;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public updateName(name: string): Document {
    if (!name || name.trim() === '') {
      throw new Error('Nome do documento é obrigatório');
    }

    return new Document({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId: this._documentTypeId,
      name,
      status: this._status,
      sentAt: this._sentAt,
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
      rejectionReason: this._rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public markAsSent(): Document {
    if (!this._status.isPending()) {
      throw new Error('Apenas documentos pendentes podem ser marcados como enviados');
    }

    return new Document({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId: this._documentTypeId,
      name: this._name,
      status: DocumentStatus.sent(),
      sentAt: new Date(),
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
      rejectionReason: this._rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public markAsApproved(): Document {
    if (!this._status.isSent()) {
      throw new Error('Apenas documentos enviados podem ser aprovados');
    }

    return new Document({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId: this._documentTypeId,
      name: this._name,
      status: DocumentStatus.approved(),
      sentAt: this._sentAt,
      approvedAt: new Date(),
      rejectedAt: this._rejectedAt,
      rejectionReason: this._rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public markAsRejected(rejectionReason: string): Document {
    if (!this._status.isSent()) {
      throw new Error('Apenas documentos enviados podem ser rejeitados');
    }

    if (!rejectionReason || rejectionReason.trim() === '') {
      throw new Error('Motivo da rejeição é obrigatório');
    }

    return new Document({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId: this._documentTypeId,
      name: this._name,
      status: DocumentStatus.rejected(),
      sentAt: this._sentAt,
      approvedAt: this._approvedAt,
      rejectedAt: new Date(),
      rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public updateStatus(status: string): Document {
    return new Document({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId: this._documentTypeId,
      name: this._name,
      status,
      sentAt: this._sentAt,
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
      rejectionReason: this._rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public updateEmployeeId(employeeId: string): Document {
    if (!employeeId || employeeId.trim() === '') {
      throw new Error('ID do colaborador é obrigatório');
    }

    return new Document({
      id: this._id,
      employeeId,
      documentTypeId: this._documentTypeId,
      name: this._name,
      status: this._status,
      sentAt: this._sentAt,
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
      rejectionReason: this._rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public updateDocumentTypeId(documentTypeId: string): Document {
    if (!documentTypeId || documentTypeId.trim() === '') {
      throw new Error('ID do tipo de documento é obrigatório');
    }

    return new Document({
      id: this._id,
      employeeId: this._employeeId,
      documentTypeId,
      name: this._name,
      status: this._status,
      sentAt: this._sentAt,
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
      rejectionReason: this._rejectionReason,
      createdAt: this._createdAt,
      updatedAt: new Date()
    });
  }

  public isPending(): boolean {
    return this._status.isPending();
  }

  public isSent(): boolean {
    return this._status.isSent();
  }

  public isApproved(): boolean {
    return this._status.isApproved();
  }

  public isRejected(): boolean {
    return this._status.isRejected();
  }
}