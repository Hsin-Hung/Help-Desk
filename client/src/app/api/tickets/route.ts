import { NextRequest, NextResponse } from "next/server";
import { getTickets } from "../ticketApi";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const data = await getTickets();

  return NextResponse.json(data);
}
