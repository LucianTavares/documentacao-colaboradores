export interface InputFindByIdEmployeeDto {
  id: string;
}

export interface OutputFindByIdEmployeeDto {
  id: string;
  name: string;
  document: string;
  hiredAt: Date;
}
