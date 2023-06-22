import { TypedColumn } from "~/utils/enums";

export interface Board {
  columns: Map<TypedColumn, Column>;
}

export interface Column {
  id: TypedColumn;
  todo: Todo[];
}

export interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: string;
  image?: Image;
}

export interface Image {
  bucketId: string;
  fileId: string;
}
