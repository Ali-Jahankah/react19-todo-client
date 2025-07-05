import { useState } from 'react';
import { useTodoStore } from '../state/todos';
import type { EditAction, ITodo } from '../types/todos';
import axios from 'axios';
import { cancelAction, completedAction, editAction } from '../constants';

export const useEditTodos = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const editHandler = (todo: ITodo, action: EditAction): void => {
    if (action === editAction) {
      setEditId(todo.id);
      setEditTitle(todo.title);
      setEditDescription(todo.description);
    }
    if (action === cancelAction) {
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };
  const updateHandler = async (todo: ITodo, action?: 'completed') => {
    let updatedTodo: ITodo = todo;
    if (action === completedAction) {
      updatedTodo = { ...todo, completed: !todo.completed };
    }
    const isUpdated = await axios.put<ITodo>(
      `${import.meta.env.VITE_BASE_API}/todos/${todo.id}`,
      updatedTodo
    );
    if (isUpdated.data) {
      updateTodo(isUpdated.data);
      setEditId(null);
    }
  };
  return {
    editId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    editHandler,
    updateHandler
  };
};
