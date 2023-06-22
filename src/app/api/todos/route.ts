import { NextRequest, NextResponse } from "next/server";
import {
  getTodoGroupedByColumnServer,
  updateTodoServer,
} from "~/server/appwrite/todos";
import { TypedColumn } from "~/utils/enums";
import { Todo } from "~/utils/types";

export async function GET() {
  try {
    const data = await getTodoGroupedByColumnServer();

    return NextResponse.json(data);
  } catch (error) {
    throw error;
  }
}

export async function PUT(req: NextRequest) {
  const body: { card: Todo; columnId: TypedColumn } = await req.json();

  try {
    await updateTodoServer(body.card, body.columnId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    throw error;
  }
}
