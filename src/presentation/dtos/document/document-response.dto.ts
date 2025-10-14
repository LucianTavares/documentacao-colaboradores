export class DocumentResponseDto {
  id: string;
  name: string;
  status: string;
  employeeId: string;
  documentTypeId: string;
  sentAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
