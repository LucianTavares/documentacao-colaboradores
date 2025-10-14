import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsDateString()
  @IsOptional()
  hiredAt?: string;
}
