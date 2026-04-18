// Middleware de validação de payloads para salas
export const validarPayloadSala = (req, res, next) => {
  const { nome, localizacao, capacidade } = req.body;

  // Valida campos obrigatórios vazios
  if (!nome || !localizacao || !capacidade) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      mensagem: 'Os campos "nome", "localizacao" e "capacidade" são obrigatórios',
      camposObrigatorios: ['nome', 'localizacao', 'capacidade']
    });
  }

  // Valida se os campos estão vazios
  if (
    (typeof nome === 'string' && nome.trim() === '') ||
    (typeof localizacao === 'string' && localizacao.trim() === '') ||
    (typeof capacidade === 'string' && capacidade.trim() === '')
  ) {
    return res.status(400).json({
      erro: 'Campos vazios',
      mensagem: 'Os campos "nome", "localizacao" e "capacidade" não podem estar vazios'
    });
  }

  // Valida se capacidade é um número válido
  if (isNaN(capacidade) || parseInt(capacidade) <= 0) {
    return res.status(400).json({
      erro: 'Capacidade inválida',
      mensagem: 'A capacidade deve ser um número maior que zero'
    });
  }

  next();
};

export const validarPayloadAtualizacaoSala = (req, res, next) => {
  const { nome, localizacao, capacidade } = req.body;

  // Se algum campo for fornecido, valida se está vazio
  if (nome !== undefined && typeof nome === 'string' && nome.trim() === '') {
    return res.status(400).json({
      erro: 'Campo vazio',
      mensagem: 'O campo "nome" não pode estar vazio'
    });
  }

  if (localizacao !== undefined && typeof localizacao === 'string' && localizacao.trim() === '') {
    return res.status(400).json({
      erro: 'Campo vazio',
      mensagem: 'O campo "localizacao" não pode estar vazio'
    });
  }

  if (capacidade !== undefined && (isNaN(capacidade) || parseInt(capacidade) <= 0)) {
    return res.status(400).json({
      erro: 'Capacidade inválida',
      mensagem: 'A capacidade deve ser um número maior que zero'
    });
  }

  next();
};
