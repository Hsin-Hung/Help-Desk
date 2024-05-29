import { NextRequest, NextResponse } from "next/server";
import { getTicket } from "@/app/api/ticketApi";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return {
      status: 400,
      body: 'Valid ID and response are required.'
    };
  }

  const data = await getTicket(id);

  return NextResponse.json(data);
}