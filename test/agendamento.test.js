import request from 'supertest';
import { expect } from 'chai';
import { app } from '../index.js';

describe('Testes de Agendamento de Sala (US03)', () => {
  let token;

  // Realizar login para obter o token antes dos testes
  before(async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'fabio@empresa.com', senha: '456' });
    
    token = res.body.token;
  });

  it('Deve criar um agendamento com sucesso', async () => {
    const res = await request(app)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        salaNome: 'Sala Alpha',
        data: '2026-05-01',
        horaInicio: '10:00',
        horaFim: '11:00'
      });

    expect(res.status).to.equal(201);
    expect(res.body.mensagem).to.equal('Agendamento realizado com sucesso!');
  });

  it('Não deve permitir agendamento em sala inexistente', async () => {
    const res = await request(app)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        salaNome: 'Sala Secreta Inexistente',
        data: '2026-05-01',
        horaInicio: '10:00',
        horaFim: '11:00'
      });

    expect(res.status).to.equal(404);
    expect(res.body.erro).to.contain('não foi encontrada');
  });

  it('Deve barrar agendamento com conflito de horário (Regra de Ouro)', async () => {
    // Primeiro agendamento (já criado no primeiro teste: 10:00 - 11:00)
    
    const res = await request(app)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        salaNome: 'Sala Alpha',
        data: '2026-05-01',
        horaInicio: '10:30',
        horaFim: '11:30'
      });

    expect(res.status).to.equal(409);
    expect(res.body.erro).to.equal('Conflito de horário: a sala já está reservada para este período');
  });

  it('Deve permitir agendamento na mesma sala em horários diferentes', async () => {
    const res = await request(app)
      .post('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        salaNome: 'Sala Alpha',
        data: '2026-05-01',
        horaInicio: '11:00',
        horaFim: '12:00'
      });

    expect(res.status).to.equal(201);
  });
});
