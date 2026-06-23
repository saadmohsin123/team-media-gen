import { NextResponse } from "next/server";
import { checkImagineArtMcpConnection } from "@/lib/imagineart-mcp";

export const runtime = "nodejs";

export async function GET() {
  try {
    const status = await checkImagineArtMcpConnection();
    return NextResponse.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "ImagineArt MCP unavailable.";
    return NextResponse.json({ ok: false, error: message, tools: [] }, { status: 503 });
  }
}
