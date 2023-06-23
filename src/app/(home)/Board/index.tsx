"use client";

import React, { useCallback, useEffect } from "react";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "~/store";
import { Column as ColumnType } from "~/utils/types";
import Column from "./Column";

function Board() {
  const { getBoard, board, setBoardState, updateTodoInDB } = useBoardStore();

  const init = useCallback(async () => {
    getBoard();
  }, [getBoard]);

  useEffect(() => {
    init();
  }, [init]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    if (type === "card") {
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const finishColIndex = columns[Number(destination.droppableId)];

      const startCol: ColumnType = {
        id: startColIndex[0],
        todo: startColIndex[1].todo,
      };

      const finishCol: ColumnType = {
        id: finishColIndex[0],
        todo: finishColIndex[1].todo,
      };

      if (!startCol || !finishCol) return;
      if (source.index === destination.index && startCol === finishCol) return;

      const newTodo = startCol.todo;
      const [todoMoved] = newTodo.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        newTodo.splice(destination.index, 0, todoMoved);
        const newCol = {
          id: startCol.id,
          todo: newTodo,
        };

        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        setBoardState({ ...board, columns: newColumns });
      } else {
        const finishTodo = Array.from(finishCol.todo);
        finishTodo.splice(destination.index, 0, todoMoved);

        const newColumns = new Map(board.columns);
        const newCol = {
          id: startCol.id,
          todo: newTodo,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todo: finishTodo,
        });

        updateTodoInDB(todoMoved, finishCol.id);
        setBoardState({ ...board, columns: newColumns });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todo={column.todo} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
