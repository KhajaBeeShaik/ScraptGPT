# ScraptGPT
## AI-Powered Live Chat & Web Search Platform

Full-stack, streaming-enabled conversational AI platform combining a **Next.js (TypeScript)** frontend with a **FastAPI** backend, integrated with **LangChain**, **LangGraph**, and **OpenAI APIs** for real-time, contextual web search and AI chat.

<p align="left">
  <a href="https://vercel.com"><img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel"></a>
  <a href="#"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js"></a>
  <a href="#"><img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.110+-009688?logo=fastapi&logoColor=white"></a>
  <a href="#"><img alt="LangChain" src="https://img.shields.io/badge/LangChain-Agents-0a7ea4"></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/License-MIT-green"></a>
</p>

---

## 🚀 Features

- **🔴 Real-Time Token Streaming** — Frontend & backend streaming pipeline for low-latency conversational updates (**~60–80% faster perceived response**).
- **🧠 Multi-Agent Reasoning** — LangGraph DAG orchestration + LangChain agents for live web search, parsing, summarization, and contextual answers.
- **💬 Dynamic & Context-Aware Responses** — Integrated with OpenAI LLMs, ReACT-style prompt engineering, and external API connectors (e.g., weather, search).
- **🖥️ Adaptive UI** — Markdown-supported chat interface, mobile responsive, with secure CORS-based API communication.
- **📊 Observability & Debugging** — Token usage tracking, reasoning path visualization, and latency metrics logging.

---

## 🏗️ Tech Stack

**Frontend**
- Next.js (TypeScript), React
- Tailwind CSS
- `react-markdown` (rendering), SSE via `EventSource`

**Backend**
- FastAPI (Python)
- LangChain, LangGraph (agents + orchestration)
- OpenAI API
- Async streaming endpoints

**Deployment & DevOps**
- Vercel (frontend)
- Render/Fly/Any VM (backend) — configurable
- Environment-based secrets management
- CORS configuration

---

## 🧭 Architecture (High Level)

```text
Next.js (Client)
  ├─ Chat UI (Markdown, streaming)
  ├─ EventSource (SSE)  ───────────────┐
  └─ Env-configured base URL           │
                                       ▼
FastAPI (Server)
  ├─ /chat_stream (SSE)
  ├─ LangGraph DAG (multi-agent)
  ├─ LangChain tools (search, weather, etc.)
  └─ OpenAI API (ReACT prompting)


├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── components/     # UI components (MessageArea, InputBar, Header, etc.)
│   │   ├── app/            # App Router pages
│   │   └── types/          # Shared TS types (Message, SearchInfo)
│   └── public/             # Assets
├── server/                 # FastAPI backend
│   ├── agents/             # LangChain/LangGraph logic
│   ├── routes/             # API endpoints (SSE, tools)
│   └── core/               # Settings, middleware, utils
└── README.md               # Project documentation
