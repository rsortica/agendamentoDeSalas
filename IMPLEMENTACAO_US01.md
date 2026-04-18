# US01 - Cadastro de Salas de Reunião

## Descrição

Esta é a implementação da User Story 01 (US01) do projeto "Agendamento de Salas de Reunião". A feature permite que administradores do sistema cadastrem, editem e deletem salas de reunião que serão disponibilizadas para agendamento pelos times.

## Funcionalidades Implementadas

### 1. Criar Sala (POST /salas)
- Cadastra uma nova sala de reunião com os campos: **nome**, **localização** e **capacidade**
- Valida se os campos obrigatórios estão preenchidos e não vazios
- Impede cadastro de salas com nomes duplicados
- Retorna erro 400 se os campos forem inválidos ou vazios
- Retorna status 201 com os dados da sala criada

### 2. Listar Salas (GET /salas)
- Retorna uma lista com todas as salas cadastradas
- Inclui total de salas disponíveis
- Cada sala contém: id, nome, localização, capacidade e data de criação

### 3. Obter Sala por ID (GET /salas/{id})
- Retorna os detalhes de uma sala específica
- Retorna erro 404 se a sala não for encontrada

### 4. Atualizar Sala (PUT /salas/{id})
- Permite atualizar os campos da sala (nome, localização, capacidade)
- Valida se os campos estão vazios quando fornecidos
- Impede atualizar para um nome que já existe (duplicação)
- Retorna erro 404 se a sala não for encontrada

### 5. Deletar Sala (DELETE /salas/{id})
- Remove uma sala do sistema
- Retorna erro 404 se a sala não for encontrada

## Tecnologias Utilizadas

- **Node.js** com ES Modules
- **Express.js** - Framework web
- **Swagger/OpenAPI** - Documentação interativa da API
- **Dados em memória** - Armazenamento persistente durante a execução

## Estrutura do Projeto

```
src/
├── index.js                 # Arquivo principal e configuração do Express
├── controllers/
│   └── salasController.js   # Lógica de negócio para salas
├── middlewares/
│   └── validacaoSalas.js    # Validação de payloads
├── data/
│   └── salas.js             # Armazenamento e operações de dados em memória
└── routes/
    └── salasRoutes.js       # Definição das rotas da API
```

## Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor
```bash
npm start
```

ou

```bash
node src/index.js
```

O servidor será iniciado em `http://localhost:3000`

### 3. Acessar a Documentação
Acesse `http://localhost:3000/api-docs` para visualizar e testar os endpoints usando Swagger UI.

## Exemplos de Uso

### Criar uma Sala

**Request:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Sala de Reunião A",
    "localizacao": "Andar 2, Ala Norte",
    "capacidade": 10
  }'
```

**Response (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Sala criada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Sala de Reunião A",
    "localizacao": "Andar 2, Ala Norte",
    "capacidade": 10,
    "dataCriacao": "2026-04-18T14:46:27.700Z"
  }
}
```

### Listar Salas

**Request:**
```bash
curl -X GET http://localhost:3000/salas
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Sala de Reunião A",
      "localizacao": "Andar 2, Ala Norte",
      "capacidade": 10,
      "dataCriacao": "2026-04-18T14:46:27.700Z"
    }
  ],
  "total": 1
}
```

### Obter Sala por ID

**Request:**
```bash
curl -X GET http://localhost:3000/salas/1
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "Sala de Reunião A",
    "localizacao": "Andar 2, Ala Norte",
    "capacidade": 10,
    "dataCriacao": "2026-04-18T14:46:27.700Z"
  }
}
```

### Atualizar uma Sala

**Request:**
```bash
curl -X PUT http://localhost:3000/salas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Sala de Conferência A",
    "capacidade": 15
  }'
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Sala atualizada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Sala de Conferência A",
    "localizacao": "Andar 2, Ala Norte",
    "capacidade": 15,
    "dataCriacao": "2026-04-18T14:46:27.700Z",
    "dataAtualizacao": "2026-04-18T14:50:00.000Z"
  }
}
```

### Deletar uma Sala

**Request:**
```bash
curl -X DELETE http://localhost:3000/salas/1
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Sala deletada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Sala de Reunião A"
  }
}
```

## Validações e Regras de Negócio

### 1. Campos Obrigatórios
- `nome` - Obrigatório, não pode estar vazio
- `localizacao` - Obrigatório, não pode estar vazio
- `capacidade` - Obrigatório, deve ser um número maior que zero

### 2. Validação de Duplicação
- Não é permitido cadastrar duas salas com o mesmo nome
- A validação é case-insensitive
- Retorna erro 400 se tentar cadastrar com nome duplicado

### 3. Tratamento de Erros

#### Error 400 - Campos Obrigatórios Faltando
```json
{
  "erro": "Campos obrigatórios faltando",
  "mensagem": "Os campos \"nome\", \"localizacao\" e \"capacidade\" são obrigatórios",
  "camposObrigatorios": ["nome", "localizacao", "capacidade"]
}
```

#### Error 400 - Campos Vazios
```json
{
  "erro": "Campos vazios",
  "mensagem": "Os campos \"nome\", \"localizacao\" e \"capacidade\" não podem estar vazios"
}
```

#### Error 400 - Sala Duplicada
```json
{
  "erro": "Sala duplicada",
  "mensagem": "Já existe uma sala cadastrada com o nome \"Sala de Reunião A\""
}
```

#### Error 404 - Sala Não Encontrada
```json
{
  "erro": "Sala não encontrada",
  "mensagem": "A sala com ID 999 não foi encontrada"
}
```

## Próximas Etapas

- [ ] Implementar autenticação e autorização (JWT)
- [ ] Implementar persistência em banco de dados (MongoDB/PostgreSQL)
- [ ] Implementar feature de agendamento de salas
- [ ] Adicionar testes automatizados
- [ ] Implementar logs de auditoria
- [ ] Adicionar validação de horários de disponibilidade

## Linguagem

Toda a API foi desenvolvida em **português-BR** conforme requisitos, incluindo:
- Nomes de campos nas requisições e respostas
- Mensagens de erro
- Documentação de código
