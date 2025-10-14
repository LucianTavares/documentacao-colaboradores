import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(['PENDING', 'SENT', 'APPROVED', 'REJECTED'])
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  documentTypeId: string;
}
