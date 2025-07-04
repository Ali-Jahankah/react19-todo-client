import React, { useEffect, useState, type FC, type ReactElement } from 'react';
import { type IGetTodoResponse, type ITodo } from '../types/todos';
import { useTodoStore } from '../state/todos';
import axios from 'axios';
import TodoForm from '../components/TodoForm';

const Home: FC = (): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [forceRefresh, setForceRefresh] = useState<boolean>(true);

  const todos: ITodo[] = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);

  useEffect(() => {
    console.log('first');
    const fetchTodos = async (): Promise<void> => {
      try {
        const res = await axios.get<IGetTodoResponse>(
          `http://localhost:4001/api/todos?page=${page}&limit=4`
        );
        setTodos(res.data.todos);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log('Error while fetching todos ', error);
      }
    };
    fetchTodos();
  }, [setTodos, page, forceRefresh]);
  const nextPage = () => page < totalPages && setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);
  return (
    <main>
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <h2>No Todos yet</h2>
      ) : (
        <ul>
          {todos.map(({ id, title, completed }: ITodo): ReactElement => {
            return (
              <li key={id}>
                {title} {completed ? '✅' : '❌'}
              </li>
            );
          })}
        </ul>
      )}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <TodoForm
        page={page}
        setPage={setPage}
        setForceRefresh={setForceRefresh}
      />
    </main>
  );
};
export default Home;
