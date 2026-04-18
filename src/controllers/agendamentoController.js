import { bancoDeDados } from '../database/bancoDeDados.js';

export const criarAgendamento = (req, res) => {
  const { salaNome, data, horaInicio, horaFim } = req.body;
  const usuarioId = req.usuarioId;

  // Validação de campos obrigatórios
  if (!salaNome || !data || !horaInicio || !horaFim) {
    return res.status(400).json({ erro: "Todos os campos (salaNome, data, horaInicio, horaFim) são obrigatórios" });
  }

  // Verifica se a sala existe
  const salaExiste = bancoDeDados.salas.find(s => s.nome === salaNome);
  if (!salaExiste) {
    return res.status(404).json({ erro: `A sala '${salaNome}' não foi encontrada` });
  }

  // Regra de Ouro: Verificar sobreposição
  const temConflito = bancoDeDados.agendamentos.some(agendamento => {
    // Mesma sala e mesma data
    if (agendamento.salaNome === salaNome && agendamento.data === data) {
      // Lógica de sobreposição de horários
      // (NovoInicio < ExistenteFim) E (NovoFim > ExistenteInicio)
      return (horaInicio < agendamento.horaFim && horaFim > agendamento.horaInicio);
    }
    return false;
  });

  if (temConflito) {
    return res.status(409).json({ erro: "Conflito de horário: a sala já está reservada para este período" });
  }

  // Criar o agendamento
  const novoAgendamento = {
    id: bancoDeDados.agendamentos.length + 1,
    salaNome,
    data,
    horaInicio,
    horaFim,
    usuarioId
  };

  bancoDeDados.agendamentos.push(novoAgendamento);

  return res.status(201).json({
    mensagem: "Agendamento realizado com sucesso!",
    agendamento: novoAgendamento
  });
};
