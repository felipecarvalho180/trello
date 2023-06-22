import { NextResponse } from "next/server";
import { getTodoGroupedByColumnServer } from "~/server/appwrite/todos";

export async function GET() {
  try {
    const data = await getTodoGroupedByColumnServer();

    return NextResponse.json(data);
  } catch (error) {
    throw error;
  }
}
