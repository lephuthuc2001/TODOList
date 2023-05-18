import { create } from "zustand";
import type { Todo } from "../models/Todo";
import { immer } from "zustand/middleware/immer";
import { getItemFromLocalStorage, storeOnLocalStorage } from "../utils";

interface todoState {
  todoList: Todo[];
}

interface todoActions {
  addTodo(todo: Todo): void;
  removeTodo(id: string): void;
  checkDone(id: string, isDone: boolean): void;
}

const initTodoState = (): Todo[] => {
  const todoList = getItemFromLocalStorage("todoList");

  if (todoList) {
    return JSON.parse(todoList);
  }

  return [];
};
const useTodoStore = create(
  immer<todoState & todoActions>((set) => ({
    todoList: initTodoState(),
    addTodo: (todo: Todo) =>
      set((state) => {
        state.todoList.push(todo);
        storeOnLocalStorage("todoList", JSON.stringify(state.todoList));
      }),
    removeTodo: (id: string) => {
      set((state) => {
        state.todoList = state.todoList.filter((todo) => todo.id !== id);
        storeOnLocalStorage("todoList", JSON.stringify(state.todoList));
      });
    },
    checkDone: (id: string, isDone: boolean) => {
      set((state) => {
        const updatedTodo = state.todoList.find((todo) => todo.id === id)!;
        updatedTodo.isDone = isDone;
        storeOnLocalStorage("todoList", JSON.stringify(state.todoList));
      });
    },
  }))
);

export default useTodoStore;
