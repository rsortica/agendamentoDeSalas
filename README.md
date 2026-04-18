# API de Agendamento de Salas

API REST Node.js para agendamento e gerenciamento de salas.

## Descrição

Este projeto oferece uma API RESTful para gerenciar a disponibilidade e agendamento de salas, permitindo integração com aplicações frontend e terceiros para reserva eficiente de espaços.

## Tecnologias

- **Node.js** com ES Modules
- **Mocha** - Framework de testes
- **npm** - Gerenciador de pacotes

## Instalação

Clone o repositório:

```bash
git clone https://github.com/rsortica/agendamentoDeSalas.git
cd agendamentoDeSalas
```

Instale as dependências:

```bash
npm install
```

## Como Executar

Para iniciar a API:

```bash
node index.js
```

A API estará disponível em `http://localhost:3000` (porta padrão, sujeita a alterações)

## Testes

Para executar os testes:

```bash
npm test
```

Os testes são implementados com Mocha. Adicione seus testes na pasta `test/`.

## Estrutura do Projeto

``` da API
├── test/                   # Testes
├── package.json            # Configuração do projeto
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
└── index.js                # Ponto de entrada
```

## Desenvolvimento

### Estrutura de Arquivos Sugerida

- `src/index.js` - Ponto de entrada da API
- `src/routes/` - Rotas dos endpoints
- `src/controllers/` - Controladores para lógica de requisição
- `src/models/` - Modelos de dados (Sala, Agendamento, etc)
- `src/services/` - Lógica de negócio
- `test/` - Testes unitários e de integração

### Endpoints Planejados

- `GET /api/salas` - Listar todas as salas
- `POST /api/salas` - Criar nova sala
- `GET /api/salas/:id` - Obter detalhes da sala
- `PUT /api/salas/:id` - Atualizar sala
- `DELETE /api/salas/:id` - Deletar sala
- `GET /api/agendamentos` - Listar agendamentos
- `POST /api/agendamentos` - Criar novo agendamento
- `GET /api/agendamentos/:id` - Obter detalhes do agendamento
- `PUT /api/agendamentos/:id` - Atualizar agendamento
- `DELETE /api/agendamentos/:id` - Cancelar agendamentgendamento, etc)
- `src/services/` - Lógica de negócio
- `test/` - Testes unitários e de integração

### Padrões do Projeto

- Use ES Modules (`import`/`export`)
- Escreva testes para novas funcionalidades
- Mantenha o código limpo e documentado

## Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

ISC

## Autor

[rsortica](https://github.com/rsortica)

## Links

- [GitHub Repository](https://github.com/rsortica/agendamentoDeSalas)
- [Issues](https://github.com/rsortica/agendamentoDeSalas/issues)
