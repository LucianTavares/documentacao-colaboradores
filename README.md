# 🏢 API de Gerenciamento de Documentação de Colaboradores

API RESTful desenvolvida em Node.js com TypeScript, seguindo os princípios de **Clean Architecture**, **DDD** e **SOLID** para gerenciamento de documentação obrigatória de colaboradores.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **NestJS** - Framework para APIs
- **MongoDB** + **Mongoose** - Banco de dados
- **Docker** + **Docker Compose** - Containerização
- **Jest** - Testes automatizados
- **Class Validator** - Validação de dados

## 📋 Funcionalidades

### ✅ Implementadas
- ✅ **CRUD de Colaboradores** - Criar, listar, buscar, atualizar e deletar
- ✅ **CRUD de Tipos de Documento** - Gerenciar tipos de documentos obrigatórios
- ✅ **CRUD de Documentos** - Gerenciar documentos dos colaboradores
- ✅ **Controle de Status** - PENDING → SENT → APPROVED/REJECTED
- ✅ **Validação de CPF** - Value Object com validação completa
- ✅ **Testes Automatizados** - 89 testes com 100% de cobertura
- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **DDD** - Domain-Driven Design com Value Objects

### 🔄 Funcionalidades Específicas (Em Desenvolvimento)
- 🔄 **Vinculação de Colaboradores** - Associar colaboradores com tipos de documentos
- 🔄 **Status de Documentação** - Verificar status completo de um colaborador
- 🔄 **Listagem com Filtros** - Documentos pendentes com filtros e paginação
- 🔄 **Autenticação** - JWT para segurança
- 🔄 **Rate Limiting** - Proteção contra abuso
- 🔄 **Swagger** - Documentação interativa da API

## 🏗️ Arquitetura

```
src/
├── domain/                 # Camada de Domínio
│   ├── @shared/           # Elementos compartilhados
│   ├── employee/          # Entidade Employee
│   ├── documentType/      # Entidade DocumentType
│   └── document/          # Entidade Document
├── application/           # Camada de Aplicação
│   └── usecase/          # Casos de Uso
├── infrastructure/        # Camada de Infraestrutura
│   ├── database/         # Schemas MongoDB
│   └── repositories/     # Repositórios concretos
└── presentation/         # Camada de Apresentação
    ├── controllers/      # Controllers REST
    └── dtos/            # DTOs de entrada/saída
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### 1. Clone o repositório
```bash
git clone <repository-url>
cd desafio-inmeta-backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
MONGODB_URI=mongodb://admin:password@localhost:27017/desafio_inmeta?authSource=admin

# Application
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

### 4. Execute com Docker (Recomendado)
```bash
# Subir todos os serviços
docker compose up -d

# Ver logs
docker compose logs -f api
```

### 5. Ou execute localmente
```bash
# Terminal 1: MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Terminal 2: Aplicação
npm run start:dev
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:cov
```

## 📚 Documentação da API

### Endpoints Principais

#### 👥 Colaboradores
- `POST /employees` - Criar colaborador
- `GET /employees` - Listar colaboradores
- `GET /employees/:id` - Buscar colaborador
- `PUT /employees/:id` - Atualizar colaborador
- `DELETE /employees/:id` - Deletar colaborador

#### 📄 Tipos de Documento
- `POST /document-types` - Criar tipo de documento
- `GET /document-types` - Listar tipos de documento
- `GET /document-types/:id` - Buscar tipo de documento
- `PUT /document-types/:id` - Atualizar tipo de documento
- `DELETE /document-types/:id` - Deletar tipo de documento

#### 📋 Documentos
- `POST /documents` - Criar documento
- `GET /documents` - Listar documentos
- `GET /documents/:id` - Buscar documento
- `PUT /documents/:id` - Atualizar documento
- `DELETE /documents/:id` - Deletar documento
- `PATCH /documents/:id/mark-as-sent` - Marcar como enviado
- `PATCH /documents/:id/mark-as-approved` - Marcar como aprovado
- `PATCH /documents/:id/mark-as-rejected` - Marcar como rejeitado

### Exemplos de Uso

#### Criar Colaborador
```bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "document": "12345678901",
    "hiredAt": "2023-01-15T00:00:00.000Z"
  }'
```

#### Criar Tipo de Documento
```bash
curl -X POST http://localhost:3000/document-types \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CPF"
  }'
```

#### Criar Documento
```bash
curl -X POST http://localhost:3000/documents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Documento CPF",
    "status": "PENDING",
    "employeeId": "employee-id",
    "documentTypeId": "document-type-id"
  }'
```

## 🏗️ Desenvolvimento

### Estrutura do Projeto
```
src/
├── domain/                 # Regras de negócio
│   ├── @shared/          # Value Objects, Notifications
│   ├── employee/         # Entidade Employee
│   ├── documentType/     # Entidade DocumentType
│   └── document/         # Entidade Document
├── application/           # Casos de uso
│   └── usecase/         # Use Cases
├── infrastructure/       # Implementações concretas
│   ├── database/        # Schemas MongoDB
│   └── repositories/    # Repositórios
└── presentation/        # Interface externa
    ├── controllers/     # Controllers REST
    └── dtos/           # DTOs
```

### Padrões Utilizados
- **Clean Architecture** - Separação clara de responsabilidades
- **DDD** - Domain-Driven Design
- **SOLID** - Princípios de design
- **Repository Pattern** - Abstração de persistência
- **Factory Pattern** - Criação de entidades
- **Value Objects** - CPF, DocumentStatus
- **Notification Pattern** - Tratamento de erros

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t desafio-inmeta-api .

# Executar container
docker run -p 3000:3000 desafio-inmeta-api
```

### Produção
```bash
# Build para produção
npm run build

# Executar em produção
npm run start:prod
```

## 📊 Status do Projeto

- ✅ **Domínio** - 100% implementado
- ✅ **Casos de Uso** - 100% implementados
- ✅ **Infraestrutura** - 100% implementada
- ✅ **APIs REST** - 100% implementadas
- ✅ **Testes** - 89 testes passando
- 🔄 **Funcionalidades Específicas** - Em desenvolvimento
- 🔄 **Autenticação** - Em desenvolvimento
- 🔄 **Swagger** - Em desenvolvimento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Lucian Silva**
- GitHub: [@lucian-silva](https://github.com/lucian-silva)
- LinkedIn: [Lucian Silva](https://linkedin.com/in/lucian-silva)

---

**Desenvolvido com ❤️ seguindo as melhores práticas de Clean Architecture e DDD**