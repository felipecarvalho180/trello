import { create } from "zustand";
import { getTodoGroupedByColumn } from "~/client/todos";
import { TypedColumn } from "~/utils/enums";
import { formatDataToBoard } from "~/utils/helpers";
import { Board, Column } from "~/utils/types";

interface BoardState {
  board: Board;
  getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const columns = await getTodoGroupedByColumn();
    const board = formatDataToBoard(columns);

    set({ board });
  },
}));
