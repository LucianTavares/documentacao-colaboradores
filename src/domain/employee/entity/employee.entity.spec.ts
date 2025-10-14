import { Employee } from "./employee.entity";

describe('Employee unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      new Employee({
        id: '',
        name: 'John Doe',
        document: '32833025025',
        hiredAt: new Date()
      });
    }).toThrow('ID do colaborador é obrigatório');
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Employee({
        id: '1', 
        name: '',
        document: '32833025025',
        hiredAt: new Date()
      });
    }).toThrow('Nome do colaborador é obrigatório');
  })

  it('should throw error when document is empty', () => {
    expect(() => {
      new Employee({
        id: '1',
        name: 'John Doe',
        document: '',
        hiredAt: new Date()
      });
    }).toThrow('CPF inválido');
  })

  it('should throw error when hiredAt is null', () => {
    expect(() => {
      new Employee({
        id: '1',
        name: 'John Doe',
        document: '32833025025',
        hiredAt: null as any
      });
    }).toThrow('Data de contratação é obrigatória');
  })

  it('should change name', () => {
    const employee = new Employee({
      id: '1',
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date()
    });
    const updatedEmployee = employee.updateName('Jane Doe');
    expect(updatedEmployee.name).toBe('Jane Doe');
  })

  it('should change document', () => {
    const employee = new Employee({
      id: '1',
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date()
    });
    const updatedEmployee = employee.updateDocument('11144477735');
    expect(updatedEmployee.document.getValue()).toBe('11144477735');
  })

  it('should change hiredAt', () => {
    const employee = new Employee({
      id: '1',
      name: 'John Doe',
      document: '32833025025',
      hiredAt: new Date()
    });
    const newDate = new Date('2023-01-01');
    const updatedEmployee = employee.updateHiredAt(newDate);
    expect(updatedEmployee.hiredAt).toBe(newDate);
  })
});