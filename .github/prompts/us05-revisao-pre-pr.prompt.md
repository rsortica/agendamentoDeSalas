# Prompt pronto: Revisao pre-PR da US05

Atue como revisor de codigo focado em bugs, regressao e seguranca.
Analise uma implementacao da US05 (cancelar reserva) em API Node.js.

Regras que NAO podem falhar:
- Ninguem cancela reserva de outro usuario/time.
- Reserva cancelada libera sala imediatamente.

Quero uma saida objetiva com:
1. Achados criticos primeiro.
2. Lista de riscos por severidade (alta, media, baixa).
3. O que falta de teste.
4. Sugestoes de correcao com passos pequenos.
5. Check final de pronto para merge.

Formato:
- Itens curtos.
- Linguagem clara para dev junior.
- Priorize o que pode quebrar producao.
