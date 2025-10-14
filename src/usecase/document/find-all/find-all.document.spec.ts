import { DocumentFindAllUseCase } from "./find-all.document.usecase";
import { Document } from "../../../domain/document/entity/document.entity";

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}

describe('Unit tests for document find all use case', () => {

  it('should find all documents', async () => {
    const documentRepository = MockRepository();
    const documentFindAllUseCase = new DocumentFindAllUseCase(documentRepository);

    const documents = [
      new Document({
        id: 'document-1',
        name: 'Documento CPF',
        status: 'PENDING',
        employeeId: 'employee-1',
        documentTypeId: 'documentType-1'
      }),
      new Document({
        id: 'document-2',
        name: 'Documento RG',
        status: 'SENT',
        employeeId: 'employee-2',
        documentTypeId: 'documentType-2'
      })
    ];

    documentRepository.findAll.mockResolvedValue(documents);

    const output = await documentFindAllUseCase.execute();
    
    expect(output).toEqual({
      documents: [
        {
          id: 'document-1',
          name: 'Documento CPF',
          status: 'PENDING',
          employeeId: 'employee-1',
          documentTypeId: 'documentType-1'
        },
        {
          id: 'document-2',
          name: 'Documento RG',
          status: 'SENT',
          employeeId: 'employee-2',
          documentTypeId: 'documentType-2'
        }
      ]
    });

    expect(documentRepository.findAll).toHaveBeenCalled();
  })

  it('should return empty array when no documents found', async () => {
    const documentRepository = MockRepository();
    const documentFindAllUseCase = new DocumentFindAllUseCase(documentRepository);

    documentRepository.findAll.mockResolvedValue([]);

    const output = await documentFindAllUseCase.execute();
    
    expect(output).toEqual({
      documents: []
    });

    expect(documentRepository.findAll).toHaveBeenCalled();
  })

})
