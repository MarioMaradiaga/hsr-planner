import { charactersClient } from "@/clients/characters";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(charactersClient.getCharacters());
}
