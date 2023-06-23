"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TypedColumn } from "~/utils/enums";
import { Todo } from "~/utils/types";
import TodoCard from "./TodoCard";
import { useBoardStore } from "~/store";
import { useNewTodoModalStore } from "~/store/new-todo-modal/new-todo-modal.store";

interface Props {
  id: TypedColumn;
  todo: Todo[];
  index: number;
}

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, index, todo }: Props) {
  const { searchString } = useBoardStore();
  const { openModal } = useNewTodoModalStore();

  return (
    <Draggable draggableId={id} index={index}>
      {(provider) => (
        <div
          {...provider.dragHandleProps}
          {...provider.draggableProps}
          ref={provider.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl px-2 py-1 items-center">
                  {idToColumnText[id]}

                  <span className="text-gray-500 bg-gray-200 rounded-full p-2 text-sm">
                    {!searchString
                      ? todo.length
                      : todo.filter((item) =>
                          item.title
                            .toLocaleLowerCase()
                            .includes(searchString.toLocaleLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {todo
                    .filter((item) =>
                      item.title
                        .toLocaleLowerCase()
                        .includes(searchString.toLocaleLowerCase())
                    )
                    .map(($todo, index) => (
                      <Draggable
                        key={$todo.$id}
                        draggableId={$todo.$id}
                        index={index}
                      >
                        {(provider) => (
                          <TodoCard
                            todo={$todo}
                            index={index}
                            id={id}
                            innerRef={provider.innerRef}
                            draggableProps={provider.draggableProps}
                            dragHandleProps={provider.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={openModal}
                    >
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
