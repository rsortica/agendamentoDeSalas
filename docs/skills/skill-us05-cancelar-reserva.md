# Skill: Implementar cancelamento de reserva (US05)

## Quando usar
Use esta skill sempre que for implementar ou revisar cancelamento de reserva.

## Resultado esperado
- Usuario so cancela a propria reserva (ou do proprio time, se a regra do time existir).
- Sala fica disponivel imediatamente apos cancelamento.
- Sem quebrar contratos usados por outras US.

## Entradas necessarias
- Identificador do usuario autenticado.
- Identificador da reserva.
- Regra de permissao combinada pelo time (usuario ou usuario+time).
- Contrato atual de endpoint e padrao de erro.

## Passo a passo da skill
1. Confirmar contrato
- Validar rota e metodo com o time.
- Confirmar formato de resposta e erros.

2. Validar existencia da reserva
- Se nao existe: responder 404.

3. Validar permissao
- Comparar dono da reserva com usuario autenticado.
- Se nao permitido: responder 403.

4. Validar estado atual
- Se ja cancelada: responder 409 (opcional, mas recomendado).

5. Cancelar reserva
- Atualizar status para CANCELED.
- Registrar data/hora de cancelamento.

6. Garantir disponibilidade imediata
- Regras de consulta de disponibilidade devem ignorar CANCELED.

7. Testar criterios de aceite
- Sucesso de cancelamento proprio.
- Falha ao cancelar reserva de outro.
- Sala disponivel no mesmo intervalo apos cancelamento.

## Definition of Done da skill
- Endpoint funcionando com codigos HTTP corretos.
- Testes cobrindo autorizacao e disponibilidade.
- Sem alteracoes colaterais em contratos de outras US.

## Exemplo pratico rapido
Cenario:
- Usuario A criou reserva R1 na sala S1 para 10:00 as 11:00.
- Usuario B tenta cancelar R1.

Esperado:
- API retorna 403 para B.

Depois:
- Usuario A cancela R1.

Esperado:
- API retorna sucesso.
- Sala S1 fica disponivel para novo agendamento das 10:00 as 11:00.
