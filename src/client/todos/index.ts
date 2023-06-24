import { Todo } from "~/utils/types";
import { client } from "../config";
import { TypedColumn } from "~/utils/enums";
import { AddTodoParams } from "~/server/models/todos";
import { objectToFormData } from "~/utils/helpers";

export const getTodoGroupedByColumn = async () => {
  const data = await client.get("/todos");

  return data;
};

export const updateTodo = async (card: Todo, columnId: TypedColumn) => {
  try {
    const data = await client.put("/todos", {
      body: JSON.stringify({
        card,
        columnId,
      }),
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (params: AddTodoParams) => {
  try {
    const formData = objectToFormData(params);

    await client.post("/todos", {
      body: formData,
    });

    return;
  } catch (error) {
    throw error;
  }
};
