import { DocumentTypeFindAllUseCase } from "./find-all.documentType.usecase";
import { DocumentType } from "../../../domain/documentType/entity/documentType.entity";

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}

describe('Unit tests for documentType find all use case', () => {

  it('should find all documentTypes', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeFindAllUseCase = new DocumentTypeFindAllUseCase(documentTypeRepository);

    const documentTypes = [
      new DocumentType({
        id: 'documentType-1',
        name: 'CPF'
      }),
      new DocumentType({
        id: 'documentType-2',
        name: 'RG'
      })
    ];

    documentTypeRepository.findAll.mockResolvedValue(documentTypes);

    const output = await documentTypeFindAllUseCase.execute();
    
    expect(output).toEqual({
      documentTypes: [
        {
          id: 'documentType-1',
          name: 'CPF'
        },
        {
          id: 'documentType-2',
          name: 'RG'
        }
      ]
    });

    expect(documentTypeRepository.findAll).toHaveBeenCalled();
  })

  it('should return empty array when no documentTypes found', async () => {
    const documentTypeRepository = MockRepository();
    const documentTypeFindAllUseCase = new DocumentTypeFindAllUseCase(documentTypeRepository);

    documentTypeRepository.findAll.mockResolvedValue([]);

    const output = await documentTypeFindAllUseCase.execute();
    
    expect(output).toEqual({
      documentTypes: []
    });

    expect(documentTypeRepository.findAll).toHaveBeenCalled();
  })

})
