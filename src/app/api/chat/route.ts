import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const backendUrl = process.env.API_URL || "http://localhost:8000";
  const apiKey = process.env.API_KEY || "";

  try {
    const body = await request.text();
    const conversationId = request.headers.get("X-Conversation-ID") || "";

    const res = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Conversation-ID": conversationId,
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      body,
    });

    const data = await res.text();
    return new Response(data, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json(
      { detail: "Backend unreachable" },
      { status: 502 },
    );
  }
}