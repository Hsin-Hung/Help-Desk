import { NextRequest, NextResponse } from "next/server";
import { updateTicket } from "@/app/api/ticketApi";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;
    const id = Number(params.id);
    console.log(id);
    console.log(status);

    if (isNaN(id) || !status) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "ID and status are required.",
      });
    }
    const data = await updateTicket(id, status);
    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({
      ok: false,
      status: 500,
      error: "Failed to update ticket!",
    });
  }
}
