export interface InputCreateEmployeeDto {
  name: string;
  document: string;
  hiredAt: Date;
}

export interface OutputCreateEmployeeDto {
  id: string;
  name: string;
  document: string;
  hiredAt: Date;
}