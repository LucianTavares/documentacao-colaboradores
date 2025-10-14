export enum DocumentStatusEnum {
  PENDING = 'PENDING',
  SENT = 'SENT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export class DocumentStatus {
  private readonly value: DocumentStatusEnum;

  constructor(status: string) {
    if (!this.isValid(status)) {
      throw new Error('Status do documento deve ser PENDING, SENT, APPROVED ou REJECTED');
    }
    this.value = status as DocumentStatusEnum;
  }

  private isValid(status: string): boolean {
    return Object.values(DocumentStatusEnum).includes(status as DocumentStatusEnum);
  }

  getValue(): DocumentStatusEnum {
    return this.value;
  }

  isPending(): boolean {
    return this.value === DocumentStatusEnum.PENDING;
  }

  isSent(): boolean {
    return this.value === DocumentStatusEnum.SENT;
  }

  isApproved(): boolean {
    return this.value === DocumentStatusEnum.APPROVED;
  }

  isRejected(): boolean {
    return this.value === DocumentStatusEnum.REJECTED;
  }

  canTransitionTo(newStatus: DocumentStatus): boolean {
    // PENDING -> SENT
    if (this.isPending() && newStatus.isSent()) return true;
    
    // SENT -> APPROVED
    if (this.isSent() && newStatus.isApproved()) return true;
    
    // SENT -> REJECTED
    if (this.isSent() && newStatus.isRejected()) return true;
    
    // APPROVED e REJECTED são estados finais
    return false;
  }

  equals(other: DocumentStatus): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  static pending(): DocumentStatus {
    return new DocumentStatus(DocumentStatusEnum.PENDING);
  }

  static sent(): DocumentStatus {
    return new DocumentStatus(DocumentStatusEnum.SENT);
  }

  static approved(): DocumentStatus {
    return new DocumentStatus(DocumentStatusEnum.APPROVED);
  }

  static rejected(): DocumentStatus {
    return new DocumentStatus(DocumentStatusEnum.REJECTED);
  }
}
