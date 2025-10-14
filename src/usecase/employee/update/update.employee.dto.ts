export interface InputUpdateEmployeeDto {
  id: string;
  name?: string;
  document?: string;
  hiredAt?: Date;
}

export interface OutputUpdateEmployeeDto {
  id: string;
  name: string;
  document: string;
  hiredAt: Date;
}
