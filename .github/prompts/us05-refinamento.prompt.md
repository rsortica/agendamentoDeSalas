# Prompt pronto: Refinamento da US05

Voce e um arquiteto de API backend.
Analise a US abaixo e devolva uma resposta para dev junior, em portugues simples.

Contexto:
- Projeto interno de agendamento de salas.
- API de uso interno, acessivel apenas por funcionarios.
- Time com varios devs trabalhando em US paralelas.

US05:
Como responsavel pelo agendamento,
Quero poder cancelar minha reserva,
Para que a sala fique livre caso o time nao precise mais dela.

Criterios de aceite:
- Um usuario nao pode cancelar a reserva de outro usuario/time.
- Sala cancelada deve ficar imediatamente disponivel.

Quero que voce entregue:
1. Regras de negocio objetivas.
2. Casos de borda (edge cases).
3. Contrato de endpoint sugerido (rota, metodo, codigos HTTP).
4. Validacoes obrigatorias.
5. Riscos de impacto nas outras US.
6. Checklist de implementacao em passos pequenos.
7. Checklist de testes (unitario e integracao).

Formato da resposta:
- Linguagem para iniciantes.
- Itens curtos e claros.
- Sem depender de frontend.
