# Desafio INMETA - Backend

API de Gerenciamento de documentação de colaboradores desenvolvida com NestJS, TypeScript e MongoDB.

## 🚀 Tecnologias Utilizadas

- **Node.js** 18+
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **MongoDB** - Banco de dados NoSQL
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🛠️ Como executar o projeto

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd desafio-inmeta-backend
```

### 2. Configure as variáveis de ambiente
```bash
cp env.example .env
```

### 3. Execute com Docker Compose
```bash
# Para desenvolvimento
docker-compose up --build

# Para produção
docker-compose -f docker-compose.prod.yml up --build
```

### 4. Acesse a aplicação
- API: http://localhost:3000
- Health Check: http://localhost:3000/health
- MongoDB: localhost:27017

## 📚 Documentação da API

### Endpoints disponíveis

- `GET /` - Informações da API
- `GET /health` - Health check da aplicação

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Executar testes com coverage
npm run test:cov

# Executar testes e2e
npm run test:e2e
```

## 📁 Estrutura do Projeto

```
src/
├── main.ts              # Arquivo principal da aplicação
├── app.module.ts        # Módulo raiz
├── app.controller.ts    # Controller principal
├── app.service.ts       # Service principal
└── ...
```

## 🔧 Scripts Disponíveis

- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia em modo desenvolvimento
- `npm run start:debug` - Inicia em modo debug
- `npm run build` - Compila o projeto
- `npm run test` - Executa testes
- `npm run lint` - Executa linter
- `npm run format` - Formata código

## 📝 Próximos Passos

- [ ] Implementar entidades (Employee, DocumentType, Document)
- [ ] Implementar controllers e services
- [ ] Implementar validações
- [ ] Implementar testes
- [ ] Implementar documentação com Swagger
- [ ] Implementar autenticação e autorização
- [ ] Implementar rate limiting
- [ ] Implementar logging
