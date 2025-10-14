import { IsString, IsOptional } from 'class-validator';

export class UpdateDocumentTypeDto {
  @IsString()
  @IsOptional()
  name?: string;
}
