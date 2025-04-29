# LifeKB – Mobile Semantic Journal (MVP)

A **React‑Native + Expo** app that lets you capture diary entries and search them later with natural‑language questions.  The goal of v0.1 is to prove the core loop:

> *Capture → Embed → Search → Recall*

---

## 🌱 Core idea

1. **Friction‑free capture** on your phone (text or voice).
2. **Semantic indexing**: every entry is embedded with OpenAI and stored in **Pinecone**.
3. **Fast retrieval**: queries hit Pinecone, fetch matching rows from **Supabase Postgres**, and stream answers via an OpenAI Assistant.

That’s it—no analytics, automations, or wearables until the loop feels delightful.

---

## 🛠 Tech stack (v0.1)

| Layer | Choice | Why |
|-------|--------|-----|
| **Mobile UI** | React‑Native (Expo SDK 53) | One codebase, free cloud builds |
| **Backend/API** | Supabase **Edge Functions** (TypeScript) | Instant Postgres + Auth + Storage |
| **Database** | Supabase **Postgres** | Structured metadata, Row Level Security |
| **Vector Store** | **Pinecone Serverless** | Low‑ops similarity search |
| **LLM services** | **OpenAI**: Whisper, `text-embedding-3-small`, Assistants API | Best speech + RAG combo |

Everything sits comfortably on free tiers until you onboard testers.

---

## 🗺 High‑level architecture

```mermaid
flowchart TD
    subgraph Mobile
      RN[React‑Native App]
    end
    subgraph Cloud
      Supa[Supabase Edge]
      PG[(Postgres)]
      Pine[Pinecone]
      OA[(OpenAI)]
    end

    RN -- Capture -> Supa
    Supa -- INSERT --> PG
    Supa -- Whisper+Embed --> OA
    OA --> Supa
    Supa --> Pine

    RN -- Search/Chat --> Supa
    Supa --> Pine
    Supa --> PG
    Supa --> RN
```

---

## 🔑 Environment variables

```dotenv
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...
```

---

## 📦 Minimal setup steps

1. **Accounts** – Create Supabase, Pinecone, and OpenAI accounts; paste keys into `.env`.
2. **Clone & run**
   ```bash
   git clone https://github.com/yourname/life-kb.git
   cd life-kb
   npm install
   npx expo start
   ```
3. **Edge deploy** – `supabase functions deploy entries search`.

Once you can **save** an entry and **find** it via the search bar, the MVP goal is met.

