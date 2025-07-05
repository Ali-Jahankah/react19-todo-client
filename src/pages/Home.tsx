import React, { useEffect, type FC, type ReactElement } from 'react';
import { type ITodo } from '../types/todos';

import TodoForm from '../components/TodoForm';
import { useTodos } from '../hooks/useTodos';
import { useEditTodos } from '../hooks/useEditTodos';
import Pagination from '../components/Pagination';
import EditForm from '../components/EditForm';
import SingleTodo from '../components/SingleTodo';
import './home.css';

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
    <article className="home_container">
      <h1 className="home_header">
        <span className="header_spans">&lt;</span> Todo List{' '}
        <span className="header_spans">&gt;</span>
      </h1>
      <TodoForm
        page={page}
        setPage={setPage}
        setForceRefresh={setForceRefresh}
      />
      {todos.length === 0 ? (
        <h2 className="home_header"> No Todos yet</h2>
      ) : (
        <ul className="home_ul">
          {todos.map((todo: ITodo): ReactElement => {
            return (
              <li
                className={`home_li ${
                  todo.completed ? 'completed' : 'not_completed'
                }`}
                key={todo.id}
              >
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
    </article>
  );
};
export default Home;
