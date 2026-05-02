# Jesus Cristo Platform

Plataforma bilingue PT/EN centrada na mensagem de Jesus Cristo: amor, compaixao, perdao, verdade e reflexao diaria.

## Estrutura

```text
backend/
  src/
    auth/
    users/
    messages/
    artists/
    reels/
    ai-agents/
    instagram/
    scheduler/
  supabase/migrations/
  examples/

frontend/
  app/
    mensagem-do-dia/
    historia-de-jesus/
    parabolas/
    artistas/
    reels/
    sobre/
    admin/
```

## Backend

NestJS + Supabase/PostgreSQL + Supabase Auth + Instagram Graph API.

```bash
npm run backend:dev
```

Aplica primeiro a migration:

```text
backend/supabase/migrations/001_initial_schema.sql
```

## Frontend

Next.js com website publico bilingue e painel admin inicial bilingue.

```bash
npm run frontend:dev
```

## MVP

- Website publico em portugues e ingles.
- Mensagem do dia em portugues e ingles.
- Painel admin.
- Gerador com agentes Claude.
- Aprovacao manual.
- Publicacao no Instagram.

## Deploy Render

O repositorio ja inclui `render.yaml` para criar o backend NestJS como Web Service no Render.

No Render:

1. Entra no projeto `Siriusgreentech.pt`.
2. Escolhe **New > Blueprint**.
3. Liga o repositorio GitHub `SerialAlicev3/Jesus-cristo`.
4. Confirma o blueprint `jesus-cristo-api`.
5. Preenche as variaveis secretas:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID`
   - `INSTAGRAM_ACCESS_TOKEN`
   - `OPENAI_API_KEY` se quiseres fallback OpenAI

Depois de publicado, usa o URL publico do Render no frontend:

```text
NEXT_PUBLIC_API_BASE_URL=https://teu-servico-render.onrender.com/api
```
