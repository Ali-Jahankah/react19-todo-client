import type { FC, ReactElement } from 'react';
import type { ISingleTodoProps } from '../types/todos';
import { completedAction, editAction } from '../constants';
import './singleTodo.css';
const SingleTodo: FC<ISingleTodoProps> = ({
  todo,
  updateHandler,
  editHandler
}): ReactElement => {
  return (
    <>
      <div
        className={`${
          todo.completed ? 'todo_container_completed' : 'todo_container'
        }`}
      >
        <h3 className="todo_title">{todo.title}</h3>
        <div>
          <button
            className="btn todo_btn"
            onClick={() => updateHandler(todo, completedAction)}
          >
            {todo.completed ? 'Completed ✅' : 'Un-completed ❌'}
          </button>
          <button
            className="btn todo_btn"
            onClick={() => editHandler(todo, editAction)}
          >
            Edit ✏️
          </button>
        </div>
      </div>
      <p className="todo_description">{todo.description}</p>
    </>
  );
};

export default SingleTodo;
