# TechWeave DS AI Lab

Build, Test, Validate and Understand Enterprise AI Knowledge Systems.

## Prerequisites

- Node.js 20+ ([download](https://nodejs.org/))
- npm (comes with Node.js)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

### Cloudflare Pages

The app is configured for static export (`output: "export"`). Deploy the `out/` folder:

**Via CLI:**
```bash
npm run cf:deploy
```

**Via Dashboard:**
1. Go to **Cloudflare Dashboard → Pages → Create a project**
2. Connect your Git repository
3. Build command: `npm run build`
4. Build output directory: `out`
5. Deploy

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=out
```

Or connect your Git repository directly in the Netlify UI (set publish directory to `out`).

## Routes

| Route | Description |
|-------|-------------|
| `/lab` | Experience selection & knowledge health |
| `/lab/workspace` | Query knowledge, inspect retrieval & trust |
| `/lab/documents` | Manage documents, explore relationships & chunks |
| `/lab/pipeline` | Observe document-to-knowledge processing |
| `/lab/dashboard` | Operational visibility into knowledge quality |
| `/lab/insights` | Knowledge gaps, topics, utilization analytics |
| `/lab/settings` | Embedding, vector DB, LLM configuration |
