import { NextResponse } from "next/server";
import { wikiClient } from "@/clients/wiki";

export async function GET() {
  return NextResponse.json(wikiClient.getTierList());
}
