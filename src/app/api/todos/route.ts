import { NextRequest, NextResponse } from "next/server";
import {
  addTodoServer,
  getTodoGroupedByColumnServer,
  updateTodoServer,
} from "~/server/appwrite/todos";
import { TypedColumn } from "~/utils/enums";
import { Image, Todo } from "~/utils/types";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const values: { [key: string]: any } = {};

    for (const [key, value] of body.entries()) {
      values[key] = value;
    }

    await addTodoServer({
      title: values.title,
      columnId: values.columnId,
      image: values.image,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    throw error;
  }
}
