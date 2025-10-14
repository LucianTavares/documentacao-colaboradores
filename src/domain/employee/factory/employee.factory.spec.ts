import { EmployeeFactory } from "./employee.factory";

describe('Employee factory unit tests', () => {

  it('should create a employee', () => {
    const employee = EmployeeFactory.create('John Doe', '32833025025', new Date());
    expect(employee).toBeDefined();
  })
})