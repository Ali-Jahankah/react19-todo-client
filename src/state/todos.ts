import { type ITodo, type ITodoStore } from '../types/todos';
import { create } from 'zustand';

export const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  setTodos: (todos: ITodo[]) => set({ todos }),
  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }))
}));
