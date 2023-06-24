import { InputFile } from "node-appwrite";
import { formatToImage } from "~/server/mappers/todos";
import {
  AddTodoParams,
  ImageFromApi,
  TodosFromApi,
} from "~/server/models/todos";
import { ID, databases, storage } from "~/services/appwrite";
import { TypedColumn } from "~/utils/enums";
import { Todo } from "~/utils/types";

export const getTodoGroupedByColumnServer = async () => {
  const data: TodosFromApi = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const imagePromises = data.documents.map(async (item) => {
    if (item.image) {
      const image = JSON.parse(item.image!);
      const file = await storage.getFilePreview(image.bucketId, image.fileId);

      return {
        ...item,
        image: file.toString("base64"),
      };
    }

    return item;
  });

  const values = await Promise.all(imagePromises);

  return values;
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

export const addTodoServer = async ({
  title,
  columnId,
  image,
}: AddTodoParams) => {
  try {
    let file = null;
    if (image) {
      const fileUploaded = await uploadImage(image);

      if (fileUploaded) {
        file = formatToImage(fileUploaded);
      }
    }

    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title,
        status: columnId,
        image: file ? JSON.stringify(file) : null,
      }
    );

    return;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (
  image: Blob
): Promise<ImageFromApi | void> => {
  if (!image) return;

  const file = await InputFile.fromBlob(image, "file");

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_STORAGE_ID!,
    ID.unique(),
    file
  );

  return fileUploaded;
};
