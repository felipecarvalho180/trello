import { formatToImage } from "~/server/mappers/todos";
import { ImageFromApi, TodosFromApi } from "~/server/models/todos";
import { ID, databases, storage } from "~/services/appwrite";
import { TypedColumn } from "~/utils/enums";
import { formatDataURLToFile } from "~/utils/helpers";
import { Image, Todo } from "~/utils/types";

export const getTodoGroupedByColumnServer = async () => {
  const data: TodosFromApi = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  // console.log(data.documents);
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

export const addTodoServer = async (
  title: string,
  columnId: TypedColumn,
  image?: Image | null
) => {
  await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    ID.unique(),
    {
      title,
      status: columnId,
      image: JSON.stringify(image),
    }
  );

  return;
};

export const uploadImage = async (
  image: File
): Promise<ImageFromApi | void> => {
  if (!image) return;

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_STORAGE_ID!,
    ID.unique(),
    image
  );

  return fileUploaded;
};
