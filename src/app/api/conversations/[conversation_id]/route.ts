import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ conversation_id: string }> },
) {
  const backendUrl = process.env.API_URL || "http://localhost:8000";
  const apiKey = process.env.API_KEY || "";
  const { conversation_id } = await params;

  try {
    const res = await fetch(
      `${backendUrl}/api/conversations/${conversation_id}`,
      { headers: apiKey ? { "X-API-Key": apiKey } : undefined },
    );
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