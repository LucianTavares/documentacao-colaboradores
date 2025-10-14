import { DocumentTypeFactory } from "./documentType.factory";

describe('DocumentType factory unit tests', () => {

  it('should create a document type', () => {
    const documentType = DocumentTypeFactory.create('CPF');
    expect(documentType).toBeDefined();
  })
})