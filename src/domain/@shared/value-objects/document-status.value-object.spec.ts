import { DocumentStatus, DocumentStatusEnum } from "./document-status.value-object";

describe('DocumentStatus Value Object unit tests', () => {

  it('should create PENDING status', () => {
    const status = new DocumentStatus('PENDING');
    expect(status.getValue()).toBe(DocumentStatusEnum.PENDING);
    expect(status.isPending()).toBe(true);
    expect(status.isSent()).toBe(false);
    expect(status.isApproved()).toBe(false);
    expect(status.isRejected()).toBe(false);
  })

  it('should create SENT status', () => {
    const status = new DocumentStatus('SENT');
    expect(status.getValue()).toBe(DocumentStatusEnum.SENT);
    expect(status.isPending()).toBe(false);
    expect(status.isSent()).toBe(true);
    expect(status.isApproved()).toBe(false);
    expect(status.isRejected()).toBe(false);
  })

  it('should create APPROVED status', () => {
    const status = new DocumentStatus('APPROVED');
    expect(status.getValue()).toBe(DocumentStatusEnum.APPROVED);
    expect(status.isPending()).toBe(false);
    expect(status.isSent()).toBe(false);
    expect(status.isApproved()).toBe(true);
    expect(status.isRejected()).toBe(false);
  })

  it('should create REJECTED status', () => {
    const status = new DocumentStatus('REJECTED');
    expect(status.getValue()).toBe(DocumentStatusEnum.REJECTED);
    expect(status.isPending()).toBe(false);
    expect(status.isSent()).toBe(false);
    expect(status.isApproved()).toBe(false);
    expect(status.isRejected()).toBe(true);
  })

  it('should throw error when status is invalid', () => {
    expect(() => {
      new DocumentStatus('INVALID');
    }).toThrow('Status do documento deve ser PENDING, SENT, APPROVED ou REJECTED');
  })

  it('should validate transitions', () => {
    const pending = new DocumentStatus('PENDING');
    const sent = new DocumentStatus('SENT');
    const approved = new DocumentStatus('APPROVED');
    const rejected = new DocumentStatus('REJECTED');

    expect(pending.canTransitionTo(sent)).toBe(true);
    expect(pending.canTransitionTo(approved)).toBe(false);
    expect(pending.canTransitionTo(rejected)).toBe(false);

    expect(sent.canTransitionTo(approved)).toBe(true);
    expect(sent.canTransitionTo(rejected)).toBe(true);
    expect(sent.canTransitionTo(pending)).toBe(false);

    expect(approved.canTransitionTo(pending)).toBe(false);
    expect(approved.canTransitionTo(sent)).toBe(false);
    expect(approved.canTransitionTo(rejected)).toBe(false);

    expect(rejected.canTransitionTo(pending)).toBe(false);
    expect(rejected.canTransitionTo(sent)).toBe(false);
    expect(rejected.canTransitionTo(approved)).toBe(false);
  })

  it('should compare status objects', () => {
    const status1 = new DocumentStatus('PENDING');
    const status2 = new DocumentStatus('PENDING');
    const status3 = new DocumentStatus('SENT');

    expect(status1.equals(status2)).toBe(true);
    expect(status1.equals(status3)).toBe(false);
  })

  it('should convert to string', () => {
    const status = new DocumentStatus('PENDING');
    expect(status.toString()).toBe('PENDING');
  })

  it('should create using static methods', () => {
    expect(DocumentStatus.pending().getValue()).toBe(DocumentStatusEnum.PENDING);
    expect(DocumentStatus.sent().getValue()).toBe(DocumentStatusEnum.SENT);
    expect(DocumentStatus.approved().getValue()).toBe(DocumentStatusEnum.APPROVED);
    expect(DocumentStatus.rejected().getValue()).toBe(DocumentStatusEnum.REJECTED);
  })
});
