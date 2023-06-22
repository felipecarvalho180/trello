import { toast } from "react-hot-toast";
import { create } from "zustand";
import { getTodoGroupedByColumn, updateTodo } from "~/client/todos";
import { TypedColumn } from "~/utils/enums";
import { formatDataToBoard } from "~/utils/helpers";
import { Board, Column, Todo } from "~/utils/types";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;
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
  setBoardState: (board: Board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    try {
      await updateTodo(todo, columnId);
      toast.success("Atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar");
    }
  },

  searchString: "",
  setSearchString: (searchString: string) => set({ searchString }),
}));
