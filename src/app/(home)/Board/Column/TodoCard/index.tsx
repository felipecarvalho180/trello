import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { TypedColumn } from "~/utils/enums";
import { Todo } from "~/utils/types";

interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

function TodoCard({ todo, draggableProps, innerRef, dragHandleProps }: Props) {
  console.log(todo);
  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>

      {todo.image && (
        <div className="w-full h-[200px] overflow-hidden rounded-b-md">
          <Image
            src={`data:image/png;base64,${todo.image}`}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;
