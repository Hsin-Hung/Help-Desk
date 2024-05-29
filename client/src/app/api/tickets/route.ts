import { NextRequest, NextResponse } from "next/server";
import { getTickets } from "../ticketApi";
import { ok } from "assert";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  try {
    const data = await getTickets();
    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({
      ok: false,
      status: 500,
      error: "Failed to fetch tickets!",
    });
  }
}
