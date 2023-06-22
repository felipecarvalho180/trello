import { Todo } from "~/utils/types";
import { client } from "../config";
import { TypedColumn } from "~/utils/enums";

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
