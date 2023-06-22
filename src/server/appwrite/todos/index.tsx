import { TodosFromApi } from "~/server/models/todos";
import { databases } from "~/services/appwrite";

export const getTodoGroupedByColumnServer = async () => {
  const data: TodosFromApi = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  return data.documents;
};
