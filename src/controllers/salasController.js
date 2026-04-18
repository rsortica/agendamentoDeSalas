// Controller para gerenciar salas de reunião
import * as salaData from '../data/salas.js';

export const listarSalas = (req, res) => {
  try {
    const salas = salaData.obterSalas();
    
    return res.status(200).json({
      sucesso: true,
      dados: salas,
      total: salas.length
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao listar salas',
      mensagem: erro.message
    });
  }
};

export const obterSalaPorId = (req, res) => {
  try {
    const { id } = req.params;
    const sala = salaData.obterSalaPorId(id);

    if (!sala) {
      return res.status(404).json({
        erro: 'Sala não encontrada',
        mensagem: `A sala com ID ${id} não foi encontrada`
      });
    }

    return res.status(200).json({
      sucesso: true,
      dados: sala
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao obter sala',
      mensagem: erro.message
    });
  }
};

export const criarSala = (req, res) => {
  try {
    const { nome, localizacao, capacidade } = req.body;

    // Verifica se já existe sala com o mesmo nome
    const salaDuplicada = salaData.obterSalaPorNome(nome);
    if (salaDuplicada) {
      return res.status(400).json({
        erro: 'Sala duplicada',
        mensagem: `Já existe uma sala cadastrada com o nome "${nome}"`
      });
    }

    const novaSala = salaData.criarSala({
      nome,
      localizacao,
      capacidade: parseInt(capacidade)
    });

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Sala criada com sucesso',
      dados: novaSala
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao criar sala',
      mensagem: erro.message
    });
  }
};

export const atualizarSala = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, localizacao, capacidade } = req.body;

    const salaExistente = salaData.obterSalaPorId(id);
    if (!salaExistente) {
      return res.status(404).json({
        erro: 'Sala não encontrada',
        mensagem: `A sala com ID ${id} não foi encontrada`
      });
    }

    // Verifica se está tentando atualizar para um nome que já existe
    if (nome && nome !== salaExistente.nome) {
      const salaDuplicada = salaData.obterSalaPorNome(nome);
      if (salaDuplicada) {
        return res.status(400).json({
          erro: 'Sala duplicada',
          mensagem: `Já existe uma sala cadastrada com o nome "${nome}"`
        });
      }
    }

    const dadosAtualizados = {};
    if (nome !== undefined) dadosAtualizados.nome = nome;
    if (localizacao !== undefined) dadosAtualizados.localizacao = localizacao;
    if (capacidade !== undefined) dadosAtualizados.capacidade = parseInt(capacidade);

    const salaAtualizada = salaData.atualizarSala(id, dadosAtualizados);

    if (!salaAtualizada) {
      return res.status(500).json({
        erro: 'Erro ao atualizar sala',
        mensagem: 'Não foi possível atualizar a sala'
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Sala atualizada com sucesso',
      dados: salaAtualizada
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao atualizar sala',
      mensagem: erro.message
    });
  }
};

export const deletarSala = (req, res) => {
  try {
    const { id } = req.params;

    const sala = salaData.obterSalaPorId(id);
    if (!sala) {
      return res.status(404).json({
        erro: 'Sala não encontrada',
        mensagem: `A sala com ID ${id} não foi encontrada`
      });
    }

    const foiDeletada = salaData.deletarSala(id);

    if (!foiDeletada) {
      return res.status(500).json({
        erro: 'Erro ao deletar sala',
        mensagem: 'Não foi possível deletar a sala'
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Sala deletada com sucesso',
      dados: {
        id: parseInt(id),
        nome: sala.nome
      }
    });
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao deletar sala',
      mensagem: erro.message
    });
  }
};
