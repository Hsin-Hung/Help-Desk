import { NextRequest, NextResponse } from "next/server";
import { respondToTicket } from "@/app/api/ticketApi";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { response } = body;
  const id = Number(params.id);

  if (isNaN(id)) {
    return {
      status: 400,
      body: "Valid ID and response are required.",
    };
  }

  const data = await respondToTicket(id, response);

  return NextResponse.json(data);
}
