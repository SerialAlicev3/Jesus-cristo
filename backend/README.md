# Backend

NestJS API for content, approvals, Claude-style agents, scheduling, and Instagram publishing.

## Run

```bash
npm install
npm run start:dev
```

Apply `supabase/migrations/001_initial_schema.sql` in Supabase before running against a real database.

## AI Providers

The backend prefers Claude via `ANTHROPIC_API_KEY` and `CLAUDE_MODEL`. If Claude is not configured, it can fall back to OpenAI via `OPENAI_API_KEY`. With no provider keys, the agents return local fallback drafts for development.
