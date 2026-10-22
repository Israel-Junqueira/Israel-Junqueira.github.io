# AWS Certification — primeira versão

A rota `/aws-certification/` é uma área de estudo independente dentro do portfólio.

## Estrutura

- `data/aws-certification.ts`: fonte dos domínios, tópicos e relações.
- `components/aws-certification-dashboard.tsx`: dashboard, filtros, busca, mapa e modal de resumo.
- `app/aws-certification/page.tsx`: rota publicada como `/aws-certification/`.

## Como adicionar um novo tópico

Adicione um item em `awsTopics`:

```ts
{
  id: "nome-do-servico",
  title: "Nome do serviço",
  eyebrow: "Domínio · Função",
  domain: "deployment",
  summary: "O que é e qual problema resolve.",
  solves: ["Problema 1", "Problema 2"],
  keywords: ["pista da prova", "palavra-chave"],
  related: ["id-de-outro-topico"],
  status: "planned"
}
```

Use os estados:

- `studied`: já revisado no material.
- `next`: próximo assunto recomendado.
- `planned`: ainda não estudado.

Quando um novo capítulo da Udemy for enviado, a ideia é converter o resumo para essa estrutura e adicionar as relações em `awsEdges`.

