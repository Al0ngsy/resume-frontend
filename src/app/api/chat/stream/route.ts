import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const backendUrl = process.env.API_URL || "http://localhost:8000";
  const apiKey = process.env.API_KEY || "";

  try {
    const body = await request.text();
    const conversationId = request.headers.get("X-Conversation-ID") || "";

    const res = await fetch(`${backendUrl}/api/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Conversation-ID": conversationId,
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      body,
    });

    // Pipe the SSE stream through unchanged
    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return Response.json(
      { detail: "Backend unreachable" },
      { status: 502 },
    );
  }
}