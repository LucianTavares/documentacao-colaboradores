import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
