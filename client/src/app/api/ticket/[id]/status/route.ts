import { NextRequest, NextResponse } from "next/server";
import { updateTicket } from "@/app/api/ticketApi";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { status } = body;
  const id = Number(params.id);
  console.log(id);
  console.log(status);

  if (!id || !status) {
    return {
      status: 400,
      body: "ID and status are required.",
    };
  }

  const data = await updateTicket(id, status);

  return NextResponse.json(data);
}
