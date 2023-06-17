import { NextResponse } from "next/server";
import { charactersClient } from "../../../../clients/characters";

export async function GET() {
  return NextResponse.json(charactersClient.getTierList());
}
