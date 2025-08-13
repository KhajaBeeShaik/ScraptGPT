# ScraptGPT
## AI-Powered Live Chat & Web Search Platform
Full-stack, streaming-enabled conversational AI platform combining a Next.js (TypeScript) frontend with a FastAPI backend, integrated with LangChain, LangGraph, and OpenAI APIs for real-time, contextual web search and AI chat.


🚀 Features
🔴 Real-Time Token Streaming — Frontend & backend streaming pipeline for low-latency conversational updates (~60–80% faster perceived response).

🧠 Multi-Agent Reasoning — LangGraph DAG orchestration + LangChain agents for live web search, parsing, summarization, and contextual answers.

💬 Dynamic & Context-Aware Responses — Integrated with OpenAI LLMs, ReACT-style prompt engineering, and API connectors (weather, search, etc.).

🖥️ Adaptive UI — Markdown-supported chat interface, mobile responsive, with secure CORS-based API communication.

📊 Observability & Debugging Tools — Token usage tracking, reasoning path visualization, and latency metrics logging.

🏗️ Tech Stack
Frontend:

Next.js (TypeScript)

Tailwind CSS

Markdown Rendering (react-markdown)

Backend:

FastAPI (Python)

LangChain, LangGraph

Async API Streaming

OpenAI API

Deployment & DevOps:

Vercel (Frontend)

Environment-based secrets management

Cross-Origin Resource Sharing (CORS)

📂 Project Structure
bash
Copy
Edit
├── client/                 # Next.js frontend
│   ├── components/         # UI components
│   ├── pages/              # Routes
│   └── styles/             # Tailwind CSS
├── server/                 # FastAPI backend
│   ├── agents/             # LangChain/LangGraph logic
│   ├── routes/             # API endpoints
│   └── utils/              # Helper functions
└── README.md               # Project documentation


## ⚡ Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
2️⃣ Install Dependencies
Frontend:

bash
Copy
Edit
cd client
npm install
Backend:

bash
Copy
Edit
cd server
pip install -r requirements.txt
3️⃣ Set Environment Variables
Create .env files in both client and server with:

ini
Copy
Edit
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGINS=http://localhost:3000
4️⃣ Run the App
Frontend:

bash
Copy
Edit
npm run dev
Backend:

bash
Copy
Edit
uvicorn main:app --reload
📈 Performance
Streaming Pipeline — Reduced perceived latency by ~60–80%

Agent Orchestration — Modular reasoning steps using LangGraph DAG

Scalable Deployment — Vercel + environment-based secrets for secure and quick deploys

🛠️ Future Enhancements
🔍 Multi-source knowledge retrieval (PDFs, databases, APIs)

🗣️ Voice-based interaction support

📊 Analytics dashboard for chat performance and search insights

📜 License
MIT License — Free to use and modify.
