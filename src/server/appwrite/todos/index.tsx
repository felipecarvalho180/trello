import { TodosFromApi } from "~/server/models/todos";
import { databases } from "~/services/appwrite";
import { TypedColumn } from "~/utils/enums";
import { Todo } from "~/utils/types";

export const getTodoGroupedByColumnServer = async () => {
  const data: TodosFromApi = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  return data.documents;
};

export const updateTodoServer = async (card: Todo, columnId: TypedColumn) => {
  await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    card.$id,
    {
      title: card.title,
      status: columnId,
    }
  );

  return;
};
