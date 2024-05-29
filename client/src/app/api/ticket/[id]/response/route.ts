import { NextRequest, NextResponse } from "next/server";
import { respondToTicket } from "@/app/api/ticketApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { response } = body;
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "Valid ID and response are required.",
      });
    }

    const data = await respondToTicket(id, response);

    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({
      ok: false,
      status: 500,
      error: "Failed to respond to ticket!",
    });
  }
}
