
# HelpHub24/7 — Next.js Beta (Vercel-ready)

**Includes**
- Homepage + CTA (£9.99/mo test link)
- Carys chatbot via serverless API route
- One env var needed on Vercel: `OPENAI_API_KEY`

## Deploy (ZIP upload)
1) Go to Vercel → New Project → Upload.
2) Upload this ZIP.
3) After first deploy: Project → Settings → Environment Variables
   - Key: `OPENAI_API_KEY`
   - Value: your OpenAI API key
   - Scope: Production
4) Redeploy. Chat is live.

## Local dev (optional)
npm install
npm run dev
(open http://localhost:3000)
