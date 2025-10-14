import { Document } from "./document.entity";
import { DocumentStatus } from "../../@shared/value-objects/document-status.value-object";

describe('Document unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      new Document({
        id: '',
        employeeId: 'employee-1',
        documentTypeId: 'doc-type-1',
        name: 'CPF',
        status: DocumentStatus.pending()
      });
    }).toThrow('ID do documento é obrigatório');
  })

  it('should throw error when employeeId is empty', () => {
    expect(() => {
      new Document({
        id: 'doc-1',
        employeeId: '',
        documentTypeId: 'doc-type-1',
        name: 'CPF',
        status: DocumentStatus.pending()
      });
    }).toThrow('ID do colaborador é obrigatório');
  })

  it('should throw error when documentTypeId is empty', () => {
    expect(() => {
      new Document({
        id: 'doc-1',
        employeeId: 'employee-1',
        documentTypeId: '',
        name: 'CPF',
        status: DocumentStatus.pending()
      });
    }).toThrow('ID do tipo de documento é obrigatório');
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Document({
        id: 'doc-1',
        employeeId: 'employee-1',
        documentTypeId: 'doc-type-1',
        name: '',
        status: DocumentStatus.pending()
      });
    }).toThrow('Nome do documento é obrigatório');
  })

  it('should throw error when status is invalid', () => {
    expect(() => {
      new Document({
        id: 'doc-1',
        employeeId: 'employee-1',
        documentTypeId: 'doc-type-1',
        name: 'CPF',
        status: 'INVALID_STATUS'
      });
    }).toThrow('Status do documento deve ser PENDING, SENT, APPROVED ou REJECTED');
  })

  it('should create document with valid data', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
      status: DocumentStatus.pending()
    });

    expect(document.id).toBe('doc-1');
    expect(document.employeeId).toBe('employee-1');
    expect(document.documentTypeId).toBe('doc-type-1');
    expect(document.name).toBe('CPF');
    expect(document.status.getValue()).toBe('PENDING');
    expect(document.isPending()).toBe(true);
  })

  it('should update name', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
      status: DocumentStatus.pending()
    });

    const updatedDocument = document.updateName('RG');
    expect(updatedDocument.name).toBe('RG');
    expect(updatedDocument.id).toBe('doc-1');
  })

  it('should mark as sent', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
      status: DocumentStatus.pending()
    });

    const sentDocument = document.markAsSent();
    expect(sentDocument.status.getValue()).toBe('SENT');
    expect(sentDocument.isSent()).toBe(true);
    expect(sentDocument.sentAt).toBeDefined();
  })

  it('should mark as approved', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
        status: DocumentStatus.sent(),
      sentAt: new Date()
    });

    const approvedDocument = document.markAsApproved();
    expect(approvedDocument.status.getValue()).toBe('APPROVED');
    expect(approvedDocument.isApproved()).toBe(true);
    expect(approvedDocument.approvedAt).toBeDefined();
  })

  it('should mark as rejected', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
        status: DocumentStatus.sent(),
      sentAt: new Date()
    });

    const rejectedDocument = document.markAsRejected('Documento ilegível');
    expect(rejectedDocument.status.getValue()).toBe('REJECTED');
    expect(rejectedDocument.isRejected()).toBe(true);
    expect(rejectedDocument.rejectedAt).toBeDefined();
    expect(rejectedDocument.rejectionReason).toBe('Documento ilegível');
  })

  it('should throw error when trying to mark non-pending document as sent', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
        status: DocumentStatus.sent(),
      sentAt: new Date()
    });

    expect(() => {
      document.markAsSent();
    }).toThrow('Apenas documentos pendentes podem ser marcados como enviados');
  })

  it('should throw error when trying to approve non-sent document', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
      status: DocumentStatus.pending()
    });

    expect(() => {
      document.markAsApproved();
    }).toThrow('Apenas documentos enviados podem ser aprovados');
  })

  it('should throw error when trying to reject non-sent document', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
      status: DocumentStatus.pending()
    });

    expect(() => {
      document.markAsRejected('Motivo');
    }).toThrow('Apenas documentos enviados podem ser rejeitados');
  })

  it('should throw error when rejection reason is empty', () => {
    const document = new Document({
      id: 'doc-1',
      employeeId: 'employee-1',
      documentTypeId: 'doc-type-1',
      name: 'CPF',
        status: DocumentStatus.sent(),
      sentAt: new Date()
    });

    expect(() => {
      document.markAsRejected('');
    }).toThrow('Motivo da rejeição é obrigatório');
  })
});
