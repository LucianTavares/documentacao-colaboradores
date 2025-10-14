import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsDateString()
  @IsNotEmpty()
  hiredAt: string;
}
