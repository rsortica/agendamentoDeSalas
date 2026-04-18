// Banco de dados em memória para simular o armazenamento
export const bancoDeDados = {
  salas: [
    { nome: "Sala Alpha", localizacao: "Andar 1", capacidade: 10 },
    { nome: "Sala Beta", localizacao: "Andar 1", capacidade: 6 },
    { nome: "Sala Gamma", localizacao: "Andar 2", capacidade: 15 }
  ],
  agendamentos: [],
  usuarios: [
    { id: 1, nome: "Admin", email: "admin@empresa.com", senha: "123" },
    { id: 2, nome: "Fabio", email: "fabio@empresa.com", senha: "456" }
  ]
};
