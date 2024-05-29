import { NextRequest, NextResponse } from "next/server";
import { getTicket } from "@/app/api/ticketApi";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "Valid ID and response are required.",
      });
    }
    const data = await getTicket(id);
    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({
      ok: false,
      status: 500,
      error: "Failed to fetch ticket!",
    });
  }
}
