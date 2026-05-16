# StudyPath — Rota do Estudo

Plataforma de progresso acadêmico gamificado criada com React, TypeScript, Tailwind CSS, Supabase, Recharts e Lucide React.

## Rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie `.env` a partir de `.env.example` e preencha:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

3. No Supabase, execute o SQL em `supabase/schema.sql`.

4. Ative em Authentication:

- Email/password
- Email confirmation
- Google OAuth, se for usar login com Google

5. Rode:

```bash
npm run dev
```

Nunca use `service_role key` no frontend.
