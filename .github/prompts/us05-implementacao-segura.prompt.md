# Prompt pronto: Implementacao segura da US05

Atue como engenheiro backend senior e mentor de dev junior.
Quero implementar a US05 com minimo impacto em outras US.

Objetivo:
Implementar cancelamento de reserva com regra de permissao.

Requisitos:
- Usuario autenticado so pode cancelar a propria reserva.
- Ao cancelar, a sala deve ficar disponivel imediatamente.
- Evitar alterar contratos ja usados por outros devs.
- Manter alteracoes pequenas e isoladas.

Quero sua resposta em 4 blocos:
1. Plano tecnico por camadas (rota, controller, service, repositorio).
2. Estrategia de compatibilidade com outras US (baixo acoplamento).
3. Casos de erro e codigos HTTP (403, 404, 409 etc).
4. Testes minimos para garantir os criterios de aceite.

Inclua:
- Sugestao de mensagens de erro claras.
- Sequencia de commits pequenos para facilitar review.
- Riscos comuns e como evitar.

Fale em portugues simples e direta.
