import { NextRequest, NextResponse } from "next/server";
import { createTicket } from "../ticketApi";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, description } = body;
  if (!name || !email || !description) {
    return {
      status: 400,
      body: "Name, email, and description are required.",
    };
  }

  const data = await createTicket(name, email, description);

  return NextResponse.json(data);
}
