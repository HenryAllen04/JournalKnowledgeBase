# LifeKB – Components & User Journeys

## 1. Mobile App (React Native + Expo)
**Purpose**: Provide the primary interface for capture, search, and chat.

### User Journey: Create Entry
1. User taps + button on Home.
2. Chooses text, voice, or photo mode.
3. Fills content → hits Save.
4. Sees toast "Entry saved" and is returned to Home timeline.

### User Journey: Semantic Search
1. User pulls down Search tab.
2. Types / dictates query.
3. Results list renders under 1 sec.
4. Taps result → full entry view.

## 2. Supabase Edge API
**Purpose**: Stateless TypeScript functions for CRUD, search, export.
- `entries/create` – validates payload, calls enrichment pipeline.
- `search` – embeds query, queries Pinecone, fetches rows.
- `export` – packages user data to ZIP + presigned URL.

### Security Notes
- Row‑Level Security on every table.
- Functions validate `supabase.auth.getUser()` before any work.

## 3. Enrichment Pipeline
**Purpose**: Convert raw input into searchable data.
1. Whisper transcription (audio → text).
2. OpenAI embeddings (text → 1536‑dim vector).
3. Upsert vector into Pinecone, metadata into Postgres.
4. Optional sentiment scoring (future).

## 4. Vector Store (Pinecone Serverless)
**Purpose**: Nearest‑neighbour search over entries.
- Namespace per user (enforces privacy).
- Metadata filter `{ user_id, created_at }` for hybrid filtering.

## 5. Chat Assistant
**Purpose**: Natural‑language Q&A with context snippets.
- OpenAI Assistant configured with Pinecone retrieval tool.
- System prompt enforces private data scope.
- Streams answers back to app.

## 6. Analytics Cron (Edge Cron)
**Purpose**: Daily aggregation for future insights.
- Counts words and entries per day.
- Writes to `metrics_daily` table.

## 7. Export & Account Deletion
**Purpose**: Data portability & GDPR compliance.
- Exports: raw JSON entries + media files zipped.
- Deletion: remove Storage objects, Postgres rows, Pinecone vectors.

## 8. CI/CD & Release
- GitHub Actions lint/test → EAS Build preview.
- Manual promote to TestFlight / Play when tagged `v0.x`.

---
_This overview acts as the high‑level reference for each subsystem before drilling into code._

