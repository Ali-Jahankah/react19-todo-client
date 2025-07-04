import type { Dispatch, SetStateAction } from 'react';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  createdAt: string;
}
export interface IGetTodoResponse {
  todos: ITodo[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
export interface ITodoStore {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  updateTodo: (updatedTodo: ITodo) => void;
  deleteTodo: (id: number) => void;
}
export type NewTodo = Omit<ITodo, 'id' | 'createdAt'>;
export interface IPaginationProps {
  prevPage: () => void;
  page: number;
  totalPages: number;
  nextPage: () => void;
}
export interface IEditFormProps {
  editTitle: string;
  setEditTitle: Dispatch<SetStateAction<string>>;
  editDescription: string;
  setEditDescription: Dispatch<SetStateAction<string>>;
  updateHandler: (todo: ITodo, action?: 'completed') => Promise<void>;
  todo: ITodo;
  editHandler: (todo: ITodo, action: 'cancel' | 'edit') => void;
}
export interface ISingleTodoProps {
  updateHandler: (todo: ITodo, action?: 'completed') => Promise<void>;
  editHandler: (todo: ITodo, action: 'cancel' | 'edit') => void;
  todo: ITodo;
}
export type EditAction = 'cancel' | 'edit';
