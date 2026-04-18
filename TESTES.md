# Testes da API de Salas

Este documento contém exemplos de testes para validar a implementação da US01.

## Pré-requisitos

- Node.js instalado
- Servidor da API rodando em `http://localhost:3000`

## 1. Teste de Listagem Vazia

Antes de criar qualquer sala, a lista deve estar vazia.

**Comando:**
```bash
curl http://localhost:3000/salas
```

**Resposta Esperada:**
```json
{
  "sucesso": true,
  "dados": [],
  "total": 0
}
```

---

## 2. Teste de Criação de Sala - Sucesso

**Comando:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala A","localizacao":"Andar 1","capacidade":8}'
```

**Resposta Esperada:** Status 201
```json
{
  "sucesso": true,
  "mensagem": "Sala criada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Sala A",
    "localizacao": "Andar 1",
    "capacidade": 8,
    "dataCriacao": "2026-04-18T..."
  }
}
```

---

## 3. Teste de Validação - Campo Obrigatório Vazio

Tentar criar sala com nome vazio deve retornar erro 400.

**Comando:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome":"","localizacao":"Andar 1","capacidade":8}'
```

**Resposta Esperada:** Status 400
```json
{
  "erro": "Campos vazios",
  "mensagem": "Os campos \"nome\", \"localizacao\" e \"capacidade\" não podem estar vazios"
}
```

---

## 4. Teste de Validação - Campo Obrigatório Faltando

Tentar criar sala sem fornecer localização deve retornar erro 400.

**Comando:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala B","capacidade":10}'
```

**Resposta Esperada:** Status 400
```json
{
  "erro": "Campos obrigatórios faltando",
  "mensagem": "Os campos \"nome\", \"localizacao\" e \"capacidade\" são obrigatórios",
  "camposObrigatorios": ["nome", "localizacao", "capacidade"]
}
```

---

## 5. Teste de Validação - Capacidade Inválida

Tentar criar sala com capacidade não numérica ou menor que 1 deve retornar erro 400.

**Comando:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala C","localizacao":"Andar 2","capacidade":0}'
```

**Resposta Esperada:** Status 400
```json
{
  "erro": "Capacidade inválida",
  "mensagem": "A capacidade deve ser um número maior que zero"
}
```

---

## 6. Teste de Duplicação de Sala

Tentar criar uma sala com nome já existente deve retornar erro 400.

**Primeiro, criar uma sala:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala Duplicada","localizacao":"Andar 1","capacidade":12}'
```

**Depois, tentar criar outra com o mesmo nome:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala Duplicada","localizacao":"Andar 3","capacidade":14}'
```

**Resposta Esperada:** Status 400
```json
{
  "erro": "Sala duplicada",
  "mensagem": "Já existe uma sala cadastrada com o nome \"Sala Duplicada\""
}
```

---

## 7. Teste de Listar Salas

Depois de criar algumas salas, listar deve retornar todas.

**Comando:**
```bash
curl http://localhost:3000/salas
```

**Resposta Esperada:** Status 200
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Sala A",
      "localizacao": "Andar 1",
      "capacidade": 8,
      "dataCriacao": "..."
    },
    {
      "id": 2,
      "nome": "Sala B",
      "localizacao": "Andar 2",
      "capacidade": 10,
      "dataCriacao": "..."
    }
  ],
  "total": 2
}
```

---

## 8. Teste de Obter Sala por ID

**Comando:**
```bash
curl http://localhost:3000/salas/1
```

**Resposta Esperada:** Status 200
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "Sala A",
    "localizacao": "Andar 1",
    "capacidade": 8,
    "dataCriacao": "..."
  }
}
```

---

## 9. Teste de Obter Sala Inexistente

**Comando:**
```bash
curl http://localhost:3000/salas/999
```

**Resposta Esperada:** Status 404
```json
{
  "erro": "Sala não encontrada",
  "mensagem": "A sala com ID 999 não foi encontrada"
}
```

---

## 10. Teste de Atualização - Sucesso

**Comando:**
```bash
curl -X PUT http://localhost:3000/salas/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala A Atualizada","capacidade":15}'
```

**Resposta Esperada:** Status 200
```json
{
  "sucesso": true,
  "mensagem": "Sala atualizada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Sala A Atualizada",
    "localizacao": "Andar 1",
    "capacidade": 15,
    "dataCriacao": "...",
    "dataAtualizacao": "2026-04-18T..."
  }
}
```

---

## 11. Teste de Atualização - Nome Duplicado

Tentar atualizar uma sala para um nome já existente deve retornar erro 400.

**Comando:**
```bash
curl -X PUT http://localhost:3000/salas/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala B"}'
```

**Resposta Esperada:** Status 400
```json
{
  "erro": "Sala duplicada",
  "mensagem": "Já existe uma sala cadastrada com o nome \"Sala B\""
}
```

---

## 12. Teste de Atualização - Sala Inexistente

**Comando:**
```bash
curl -X PUT http://localhost:3000/salas/999 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Sala Nova"}'
```

**Resposta Esperada:** Status 404
```json
{
  "erro": "Sala não encontrada",
  "mensagem": "A sala com ID 999 não foi encontrada"
}
```

---

## 13. Teste de Deleção - Sucesso

**Comando:**
```bash
curl -X DELETE http://localhost:3000/salas/1
```

**Resposta Esperada:** Status 200
```json
{
  "sucesso": true,
  "mensagem": "Sala deletada com sucesso",
  "dados": {
    "id": 1,
    "nome": "Sala A Atualizada"
  }
}
```

---

## 14. Teste de Deleção - Sala Inexistente

**Comando:**
```bash
curl -X DELETE http://localhost:3000/salas/999
```

**Resposta Esperada:** Status 404
```json
{
  "erro": "Sala não encontrada",
  "mensagem": "A sala com ID 999 não foi encontrada"
}
```

---

## 15. Teste de Rota Não Encontrada

**Comando:**
```bash
curl http://localhost:3000/rota-inexistente
```

**Resposta Esperada:** Status 404
```json
{
  "erro": "Rota não encontrada",
  "mensagem": "A rota GET /rota-inexistente não existe",
  "documentacao": "/api-docs"
}
```

---

## Checklist de Validação

- [ ] Listar salas vazias retorna array vazio
- [ ] Criar sala com dados válidos retorna 201
- [ ] Criar sala com campo vazio retorna 400
- [ ] Criar sala com campo obrigatório faltando retorna 400
- [ ] Criar sala com capacidade inválida retorna 400
- [ ] Criar sala com nome duplicado retorna 400
- [ ] Listar salas após criação retorna todas
- [ ] Obter sala por ID retorna os dados corretos
- [ ] Obter sala inexistente retorna 404
- [ ] Atualizar sala com dados válidos retorna 200
- [ ] Atualizar sala para nome duplicado retorna 400
- [ ] Atualizar sala inexistente retorna 404
- [ ] Deletar sala existente retorna 200 e remove do sistema
- [ ] Deletar sala inexistente retorna 404
- [ ] Acessar rota inexistente retorna 404

## Usando o Swagger UI

A forma mais fácil de testar é usar a interface Swagger:

1. Inicie o servidor: `npm start`
2. Acesse: `http://localhost:3000/api-docs`
3. Expanda cada endpoint
4. Clique em "Try it out"
5. Preencha os dados e clique em "Execute"
6. Visualize a resposta

## Usando Postman ou Insomnia

Você também pode importar os endpoints para ferramentas como Postman ou Insomnia usando a URL:
```
http://localhost:3000/api-docs/swagger.json
```
