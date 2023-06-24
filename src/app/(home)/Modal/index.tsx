"use client";

import { ChangeEvent, FormEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNewTodoModalStore } from "~/store/new-todo-modal/new-todo-modal.store";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { ArrowPathIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { TypedColumn } from "~/utils/enums";
import { addTodo } from "~/client/todos";
import { toast } from "react-hot-toast";
import { useBoardStore } from "~/store";

export default function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    closeModal,
    setNewTask,
    newTaskInput,
    todoType,
    image,
    setImage,
    setTodoType,
  } = useNewTodoModalStore();
  const { getBoard } = useBoardStore();

  const [loading, setLoading] = useState(false);

  const handlePickImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files![0].type.startsWith("image/")) return;

    setImage(e.target.files![0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTaskInput) return;

    try {
      setLoading(true);
      await addTodo({ title: newTaskInput, columnId: todoType, image });
      await getBoard();

      setImage(null);
      setTodoType(TypedColumn.todo);
      setNewTask("");

      toast.success("Task added successfully");
      closeModal();
    } catch (error) {
      toast.error("Error while adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        onClose={closeModal}
        className="z-10 relative"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                <TaskTypeRadioGroup />

                <div>
                  <button
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                    type="button"
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>

                  {image && (
                    <button
                      type="button"
                      className="cursor-pointer relative w-full filter hover:grayscale transition-all duration-150 group"
                      onClick={() => setImage(null)}
                    >
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Image"
                        width={200}
                        height={200}
                        className="w-full h-44 object-cover mt-2"
                      />
                      <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white uppercase bg-gray-900 py-2 px-6 rounded-full">
                        Remove
                      </span>
                    </button>
                  )}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    accept="image/jpeg, image/png"
                    hidden
                    onChange={handlePickImage}
                  />
                </div>

                <div className="flex w-full justify-end mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput || loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible: ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed gap-2 w-48 items-center"
                  >
                    <span>Add Task</span>
                    {loading && (
                      <ArrowPathIcon className="animate-spin h-6 w-6" />
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
