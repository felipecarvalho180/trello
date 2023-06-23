import { Todo } from "~/utils/types";
import { client } from "../config";
import { TypedColumn } from "~/utils/enums";
import { formatFileToString } from "~/utils/helpers";
import { uploadImage } from "~/server/appwrite/todos";
import { formatToImage } from "~/server/mappers/todos";

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

export const addTodo = async (
  title: string,
  columnId: TypedColumn,
  image?: File | null
) => {
  try {
    let file = null;
    if (image) {
      const fileUploaded = await uploadImage(image);

      if (fileUploaded) {
        file = formatToImage(fileUploaded);
      }
    }

    await client.post("/todos", {
      body: JSON.stringify({
        title,
        columnId,
        image: file,
      }),
    });

    return;
  } catch (error) {
    throw error;
  }
};
