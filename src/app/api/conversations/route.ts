export const dynamic = "force-dynamic";

export async function POST() {
  const backendUrl = process.env.API_URL || "http://localhost:8000";
  const apiKey = process.env.API_KEY || "";

  try {
    const res = await fetch(`${backendUrl}/api/conversations`, {
      method: "POST",
      headers: apiKey ? { "X-API-Key": apiKey } : undefined,
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json(
      { detail: "Backend unreachable" },
      { status: 502 },
    );
  }
}