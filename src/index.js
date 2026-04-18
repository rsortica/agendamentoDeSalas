// Arquivo principal da API
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import salasRoutes from './routes/salasRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Agendamento de Salas',
      version: '1.0.0',
      description: 'API REST para gerenciar cadastro e agendamento de salas de reunião'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Sala: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            nome: {
              type: 'string',
              example: 'Sala de Conferência A'
            },
            localizacao: {
              type: 'string',
              example: 'Andar 2, Ala Norte'
            },
            capacidade: {
              type: 'integer',
              example: 10
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time'
            },
            dataAtualizacao: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rotas
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
app.use('/salas', salasRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API de Agendamento de Salas',
    versao: '1.0.0',
    endpoints: {
      salas: '/salas',
      documentacao: '/api-docs'
    }
  });
});

// Middleware para tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.path} não existe`,
    documentacao: '/api-docs'
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 API de Agendamento de Salas rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
});

export default app;
