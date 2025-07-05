import { useState } from 'react';
import { useTodoStore } from '../state/todos';
import type { IGetTodoResponse, ITodo } from '../types/todos';
import axios from 'axios';
import { limit } from '../constants';

export const useTodos = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [forceRefresh, setForceRefresh] = useState<boolean>(true);
  const todos: ITodo[] = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);

  const fetchTodos = async (): Promise<void> => {
    try {
      const url: string = `${
        import.meta.env.VITE_BASE_API
      }/todos?page=${page}&${limit}`;
      const res = await axios.get<IGetTodoResponse>(url);
      setTodos(res.data.todos);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log('Error while fetching todos ', error);
    }
  };
  const nextPage = () => page < totalPages && setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);

  return {
    page,
    setPage,
    totalPages,
    forceRefresh,
    setForceRefresh,
    todos,
    fetchTodos,
    nextPage,
    prevPage
  };
};
