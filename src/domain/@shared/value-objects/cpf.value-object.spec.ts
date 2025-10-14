import { CPF } from "./cpf.value-object";

describe('CPF Value Object unit tests', () => {

  it('should create CPF with valid number', () => {
    const cpf = new CPF('32833025025');
    expect(cpf.getValue()).toBe('32833025025');
    expect(cpf.getFormatted()).toBe('328.330.250-25');
  })

  it('should create CPF with formatted number', () => {
    const cpf = new CPF('328.330.250-25');
    expect(cpf.getValue()).toBe('32833025025');
    expect(cpf.getFormatted()).toBe('328.330.250-25');
  })

  it('should throw error when CPF is invalid - wrong length', () => {
    expect(() => {
      new CPF('123456789');
    }).toThrow('CPF inválido');
  })

  it('should throw error when CPF is invalid - all same digits', () => {
    expect(() => {
      new CPF('11111111111');
    }).toThrow('CPF inválido');
  })

  it('should throw error when CPF is invalid - wrong check digits', () => {
    expect(() => {
      new CPF('11144477700');
    }).toThrow('CPF inválido');
  })

  it('should validate real CPF', () => {
    const cpf = new CPF('32833025025');
    expect(cpf.getValue()).toBe('32833025025');
    expect(cpf.getFormatted()).toBe('328.330.250-25');
  })

  it('should validate real CPF with formatting', () => {
    const cpf = new CPF('328.330.250-25');
    expect(cpf.getValue()).toBe('32833025025');
    expect(cpf.getFormatted()).toBe('328.330.250-25');
  })

  it('should compare CPF objects', () => {
    const cpf1 = new CPF('32833025025');
    const cpf2 = new CPF('328.330.250-25');
    const cpf3 = new CPF('11144477735');

    expect(cpf1.equals(cpf2)).toBe(true);
    expect(cpf1.equals(cpf3)).toBe(false);
  })

  it('should convert to string', () => {
    const cpf = new CPF('32833025025');
    expect(cpf.toString()).toBe('32833025025');
  })
});
