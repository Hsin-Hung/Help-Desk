import { NextRequest, NextResponse } from "next/server";
import { createTicket } from "../ticketApi";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, description } = body;
    if (!name || !email || !description) {
      return NextResponse.json({
        ok: false,
        status: 400,
        error: "Name, email, and description are required.",
      });
    }

    const data = await createTicket(name, email, description);
    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({
      ok: false,
      status: 500,
      error: "Failed to create ticket!",
    });
  }
}
