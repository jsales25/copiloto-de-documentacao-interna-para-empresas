# DocPilot

## Resumo do projeto

O DocPilot é uma aplicação web que transforma documentos empresariais em uma base de conhecimento conversacional. A ideia é permitir que usuários façam perguntas em linguagem natural e recebam respostas fundamentadas em conteúdos previamente carregados, como políticas, manuais, guias e documentos internos.

## O que ele faz e para que serve

Essa aplicação funciona como um assistente inteligente para documentação interna. Ela permite:

- fazer upload de arquivos em diferentes formatos;
- indexar o conteúdo dos documentos para recuperação semântica;
- responder perguntas com base no contexto fornecido pelos arquivos;
- facilitar o acesso rápido a informações importantes sem precisar ler tudo manualmente.

É ideal para empresas, times de suporte, equipes de produto ou qualquer cenário em que a documentação seja volumosa e precise de buscas rápidas e inteligentes.

## Screenshot

![Interface do DocPilot](public/docpilot-screenshot.svg)

## Tecnologias utilizadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- OpenAI API
- Astra DB
- LangChain
- PDF / DOCX parsing
- Node.js

## Variáveis de ambiente

Configure estas variáveis em seu arquivo .env local:

- ASTRA_DB_ENDPOINT: endpoint do banco Astra DB
- ASTRA_DB_NAMESPACE: namespace/keyspace do banco Astra DB
- ASTRA_DB_APPLICATION_TOKEN: token da aplicação Astra DB
- ASTRA_DB_COLLECTION: coleção usada para armazenar embeddings
- OPENAI_API_KEY: chave da API da OpenAI
- KEEPALIVE_SECRET: segredo compartilhado para proteger a rota /api/keepalive

Na Vercel, configure as mesmas variáveis em Project Settings > Environment Variables.

No GitHub, adicione:

- KEEPALIVE_SECRET em Secrets
- KEEPALIVE_URL em Secrets (URL pública da aplicação, por exemplo https://seu-app.vercel.app/api/keepalive)

## Como testar o keep alive

### 1. Localmente

Execute a aplicação localmente e faça uma chamada com o header correto:

```bash
curl -i http://localhost:3000/api/keepalive \
  -H "x-keepalive-secret: seu-segredo"
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Astra DB is alive",
  "timestamp": "..."
}
```

### 2. Na Vercel

Depois do deploy, teste a URL pública:

```bash
curl -i https://seu-app.vercel.app/api/keepalive \
  -H "x-keepalive-secret: seu-segredo"
```

### 3. No GitHub Actions

O workflow em .github/workflows/keepalive.yml executa diariamente. Para validar manualmente:

1. Acesse a aba Actions do repositório
2. Selecione "Keep Astra DB Alive"
3. Clique em "Run workflow"

Se a resposta retornar HTTP 200, o workflow passa. Se a rota falhar, o workflow falha.

## Como validar que não houve consumo de créditos da OpenAI ou Gemini

- A rota /api/keepalive não chama OpenAI, Gemini, LangChain, embeddings nem RAG.
- Ela apenas executa uma leitura simples na coleção do Astra DB.
- Portanto, não deve consumir créditos de OpenAI nem Gemini.

## O que eu aprendi

Durante o desenvolvimento deste projeto, aprendi a:

- integrar IA generativa com aplicações web reais;
- trabalhar com recuperação de informação com embeddings;
- criar fluxos de upload e processamento de documentos;
- estruturar uma aplicação full stack com Next.js e APIs server-side;
- lidar com segurança de credenciais e arquitetura de backend.

## Autora

Desenvolvido por Julia Sales.

- GitHub: [Link do perfil do GitHub aqui](https://github.com/jsales25)
- LinkedIn: [Link do perfil do LinkedIn aqui](https://www.linkedin.com/in/julia-sales-developer)

---

<div align="center">
  Feito com 💜 por Julia Sales
</div>

<!-- ## Observações

Este projeto pode ser expandido com autenticação de usuários, histórico de conversas, suporte a mais formatos de arquivo e melhorias na experiência de busca. -->
