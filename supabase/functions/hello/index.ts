// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("Hello from Functions!")

interface HelloResponse {
  message: string;
  timestamp: string;
  version: string;
}

serve(async (req) => {
  // Get the authentication context, if available
  const authHeader = req.headers.get('Authorization');
  const isAuthenticated = authHeader && authHeader.startsWith('Bearer ');
  
  const response: HelloResponse = {
    message: `Hello from LifeKB! ${isAuthenticated ? 'You are authenticated.' : 'You are not authenticated.'}`,
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  };

  return new Response(
    JSON.stringify(response),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke:
 * curl -i --location --request POST 'http://localhost:54321/functions/v1/hello' \
 *   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
 *   --header 'Content-Type: application/json' \
 *   --data '{"name":"Functions"}'
 */ 