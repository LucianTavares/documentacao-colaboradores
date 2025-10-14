import { DocumentType } from "./documentType.entity";

describe('DocumentType unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      new DocumentType({
        id: '',
        name: 'CPF'
      });
    }).toThrow('ID do tipo de documento é obrigatório');
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new DocumentType({
        id: '1',
        name: ''
      });
    }).toThrow('Nome do tipo de documento é obrigatório');
  })

  it('should change name', () => {
    const documentType = new DocumentType({
      id: '1',
      name: 'CPF'
    });
    const updatedDocumentType = documentType.updateName('RG');
    expect(updatedDocumentType.name).toBe('RG');
  })
})