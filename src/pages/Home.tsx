import React, { useEffect, type FC, type ReactElement } from 'react';
import { type ITodo } from '../types/todos';

import TodoForm from '../components/TodoForm';
import { useTodos } from '../hooks/useTodos';
import { useEditTodos } from '../hooks/useEditTodos';
import Pagination from '../components/Pagination';
import EditForm from '../components/EditForm';
import SingleTodo from '../components/SingleTodo';

const Home: FC = (): React.ReactElement => {
  const {
    page,
    setPage,
    totalPages,
    forceRefresh,
    setForceRefresh,
    todos,
    fetchTodos,
    nextPage,
    prevPage
  } = useTodos();
  const {
    editId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    updateHandler,
    editHandler
  } = useEditTodos();

  useEffect(() => {
    fetchTodos();
  }, [page, forceRefresh]);

  return (
    <main>
      <h1>Todo List</h1>
      {todos.length === 0 ? (
        <h2>No Todos yet</h2>
      ) : (
        <ul>
          {todos.map((todo: ITodo): ReactElement => {
            return (
              <li key={todo.id}>
                {editId === todo.id ? (
                  <EditForm
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    updateHandler={updateHandler}
                    todo={todo}
                    editHandler={editHandler}
                  />
                ) : (
                  <SingleTodo
                    todo={todo}
                    editHandler={editHandler}
                    updateHandler={updateHandler}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
      <Pagination
        prevPage={prevPage}
        page={page}
        nextPage={nextPage}
        totalPages={totalPages}
      />
      <TodoForm
        page={page}
        setPage={setPage}
        setForceRefresh={setForceRefresh}
      />
    </main>
  );
};
export default Home;
