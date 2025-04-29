## Action Checklist

Follow each component in order. Mark tasks complete as you go (✅/⬜).

1. Repository & Tooling

✅ Create GitHub repo life-kb and push main branch

✅ Add .editorconfig, .prettierrc, and ESLint config

✅ Enable Dependabot security updates

✅ Configure GitHub Actions with basic lint/test workflow

2. Supabase Foundation

⬜ Spin up Supabase project in preferred region

⬜ Create tables entry, tag, entry_tag with Row‑Level Security

⬜ Set up Storage bucket media

⬜ Write first Edge Function hello.ts and deploy via CLI

3. Expo App Skeleton

⬜ Initialise Expo SDK 53 project (expo init)

⬜ Install Supabase JS client

⬜ Implement email‑magic‑link sign‑in flow

⬜ Create navigation (Stack + Tab) with screens: Home, NewEntry, Search, Settings

4. Capture Workflow

⬜ Build NewEntry form (text input, mic button, camera button)

⬜ Record audio using expo-av; upload to Storage

⬜ POST raw payload to /entries/create Edge Function

5. Enrichment Pipeline

⬜ In Edge Function: call Whisper (if audio) for transcript

⬜ Call OpenAI embeddings → receive vector

⬜ Insert entry row in Postgres; upsert vector in Pinecone

6. Search & Chat

⬜ /search endpoint: embed query, query Pinecone, fetch rows

⬜ Build SearchScreen list UI

⬜ Create OpenAI Assistant with Pinecone retrieval tool

⬜ Build ChatScreen (streaming responses with citations)

7. Export & Privacy

⬜ Edge Function /export – bundle user data → zip → signed URL

⬜ Settings toggle to delete account (cascade delete + Pinecone vector purge)

8. CI/CD & Releases

⬜ Add eas.json; configure Android & iOS profiles

⬜ Set up EAS Build for preview (free tier)

⬜ Generate signed Android APK → internal testers

⬜ Enrol Apple Developer, run EAS iOS build → TestFlight

9. Analytics Cron (stretch)

⬜ Nightly Edge cron to compute daily counts & word stats

⬜ Display simple metrics in Home screen header
