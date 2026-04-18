// Armazenamento de salas em memória
let salas = [];
let proximoId = 1;

export const obterSalas = () => salas;

export const obterSalaPorId = (id) => {
  return salas.find(sala => sala.id === parseInt(id));
};

export const obterSalaPorNome = (nome) => {
  return salas.find(sala => sala.nome.toLowerCase() === nome.toLowerCase());
};

export const criarSala = (dadosSala) => {
  const novaSala = {
    id: proximoId++,
    nome: dadosSala.nome,
    localizacao: dadosSala.localizacao,
    capacidade: dadosSala.capacidade,
    dataCriacao: new Date().toISOString()
  };
  
  salas.push(novaSala);
  return novaSala;
};

export const atualizarSala = (id, dadosAtualizados) => {
  const sala = obterSalaPorId(id);
  
  if (!sala) {
    return null;
  }
  
  // Verifica se outro nome está sendo usado por outra sala
  if (dadosAtualizados.nome && dadosAtualizados.nome !== sala.nome) {
    const salaDuplicada = obterSalaPorNome(dadosAtualizados.nome);
    if (salaDuplicada) {
      return false; // Indica falha por duplicidade de nome
    }
  }
  
  sala.nome = dadosAtualizados.nome || sala.nome;
  sala.localizacao = dadosAtualizados.localizacao || sala.localizacao;
  sala.capacidade = dadosAtualizados.capacidade || sala.capacidade;
  sala.dataAtualizacao = new Date().toISOString();
  
  return sala;
};

export const deletarSala = (id) => {
  const indice = salas.findIndex(sala => sala.id === parseInt(id));
  
  if (indice === -1) {
    return false;
  }
  
  salas.splice(indice, 1);
  return true;
};
