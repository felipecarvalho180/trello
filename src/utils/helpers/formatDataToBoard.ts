import { DocumentFromApi } from "~/server/models/todos";
import { TypedColumn } from "~/utils/enums";
import { Board, Column } from "~/utils/types";

export const formatDataToBoard = (data: DocumentFromApi[]) => {
  const columns = data?.reduce((acc, todos) => {
    if (!acc.get(todos.status)) {
      acc.set(todos.status, {
        id: todos.status,
        todos: [],
      });
    }

    acc.get(todos.status)!.todos.push({
      $id: todos.$id,
      $createdAt: todos.$createdAt,
      status: todos.status,
      title: todos.title,
      ...(todos.image && { image: todos.image }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = [
    TypedColumn.done,
    TypedColumn.inprogress,
    TypedColumn.todo,
  ];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
