import express from 'express';
import jwt from 'jsonwebtoken';
import { bancoDeDados } from './src/database/bancoDeDados.js';
import { autenticacaoMiddleware, SEGREDO_JWT } from './src/middlewares/autenticacaoMiddleware.js';
import { criarAgendamento } from './src/controllers/agendamentoController.js';

const app = express();
app.use(express.json());

// --- Rota de Mock Login (US02 Simplificada) ---
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const usuario = bancoDeDados.usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SEGREDO_JWT, { expiresIn: '1h' });

  return res.json({ token });
});

// --- Rotas de Agendamento (US03) ---
app.post('/api/agendamentos', autenticacaoMiddleware, criarAgendamento);

// Rota auxiliar para ver as salas (US01 mockada)
app.get('/api/salas', (req, res) => {
  res.json(bancoDeDados.salas);
});

// Rota auxiliar para ver os agendamentos realizados
app.get('/api/agendamentos', (req, res) => {
  res.json(bancoDeDados.agendamentos);
});

const PORT = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

export { app };
