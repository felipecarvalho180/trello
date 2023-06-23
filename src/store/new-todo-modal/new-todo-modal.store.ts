import { create } from "zustand";
import { TypedColumn } from "~/utils/enums";

interface NewTodoModalState {
  isOpen: boolean;
  newTaskInput: string;
  setNewTask: (value: string) => void;
  todoType: TypedColumn;
  setTodoType: (value: TypedColumn) => void;
  openModal: () => void;
  closeModal: () => void;
  image: File | null;
  setImage: (value: File | null) => void;
}

export const useNewTodoModalStore = create<NewTodoModalState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  newTaskInput: "",
  setNewTask: (value: string) => set({ newTaskInput: value }),
  todoType: TypedColumn.todo,
  setTodoType: (value: TypedColumn) => set({ todoType: value }),
  image: null,
  setImage: (value) => set({ image: value }),
}));
