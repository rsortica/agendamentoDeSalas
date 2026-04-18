# Guia Pratico de Prompts e Skills para o Time

## Objetivo deste guia
Este material ajuda o time a usar IA de forma padronizada, simples e sem confusao.
A ideia e reduzir retrabalho entre as US em paralelo.

## Explicando de forma simples

### O que e um prompt
Prompt e um pedido bem escrito para a IA.
Pense como um "briefing curto": quanto mais claro, melhor a resposta.

### O que e uma skill
Skill e um roteiro reutilizavel para tarefas repetitivas.
Pense como uma "receita pronta" que o time reaplica sempre igual.

## Diferenca rapida
- Prompt: pedido pontual para uma situacao.
- Skill: processo padrao para varias situacoes parecidas.

## Quando usar cada um
- Use prompt quando voce quer analisar uma US, gerar casos de teste, revisar PR.
- Use skill quando sempre existem os mesmos passos (autorizacao, validacao, testes, respostas HTTP).

## Como usar no dia a dia (passo a passo)
1. Escolha o prompt certo na pasta .github/prompts.
2. Copie o texto do prompt e cole no chat do Copilot.
3. Preencha os dados da US e do contexto tecnico.
4. Revise a resposta e transforme em tarefas pequenas.
5. Se a tarefa for repetitiva, aplique a skill da pasta docs/skills.

## Exemplo pratico 1: Refinar uma US antes de codar
Cenario: Voce recebeu a US05 (cancelar reserva).

O que fazer:
1. Use o prompt de refinamento.
2. Peça para IA listar regras, riscos e edge cases.
3. Valide com o time o contrato de API.

Resultado esperado:
- Voce comeca a codar com menos duvida.
- Menos chance de quebrar trabalho de outros devs.

## Exemplo pratico 2: Implementar endpoint com seguranca
Cenario: Criar cancelamento com regra de permissao.

O que fazer:
1. Use o prompt de implementacao segura.
2. Aplique a skill de endpoint interno.
3. Gere testes de autorizacao e disponibilidade.

Resultado esperado:
- Usuario nao cancela reserva de outro.
- Sala volta a ficar disponivel logo apos cancelamento.

## Exemplo pratico 3: Revisao antes do PR
Cenario: Codigo pronto da US05.

O que fazer:
1. Use o prompt de revisao pre-PR.
2. Foque em regressao, seguranca e contrato HTTP.
3. Corrija os achados antes de abrir PR.

Resultado esperado:
- PR mais limpo.
- Menos idas e voltas na revisao.

## Boas praticas para iniciantes
- Sempre informar contexto: objetivo, regra de negocio, criterio de aceite.
- Sempre pedir saida estruturada: checklist, riscos, testes e resposta HTTP.
- Sempre validar com o time nomes de campos e endpoints.
- Evitar pedidos genericos como "faz ai".

## Atalho para decidir rapido
- Tarefa unica: use prompt.
- Tarefa repetitiva: use skill.
- Duvida: comece com prompt e transforme em skill quando repetir 2 ou 3 vezes.
