import { db } from "@/utils/dbConfig";
import { GRADES } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const result = await db.select().from(GRADES);
  return NextResponse.json(result);
}

export async function POST(req, res) {
  const data = await req.json();

  const result = await db.insert(GRADES).values({
    grade: data?.grade,
  });

  return NextResponse.json(result);
}
