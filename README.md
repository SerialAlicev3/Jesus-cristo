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
