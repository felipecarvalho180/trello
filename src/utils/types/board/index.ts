import { TypedColumn } from "~/utils/enums";

export interface Board {
  columns: Map<TypedColumn, Column>;
}

export interface Column {
  id: TypedColumn;
  todos: Todos[];
}

export interface Todos {
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
