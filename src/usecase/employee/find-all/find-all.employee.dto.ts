export interface OutputFindAllEmployeeDto {
  employees: {
    id: string;
    name: string;
    document: string;
    hiredAt: Date;
  }[];
}
