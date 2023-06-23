import { TypedColumn } from "~/utils/enums";
import { Image } from "~/utils/types";

export interface TodosFromApi {
  total: number;
  documents: DocumentFromApi[];
}

export interface DocumentFromApi {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  image?: File | null;
  status: TypedColumn;
  title: string;
}

export interface ImageFromApi {
  $id: string;
  bucketId: string;
}
