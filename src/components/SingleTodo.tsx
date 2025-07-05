import type { FC, ReactElement } from 'react';
import type { ISingleTodoProps } from '../types/todos';
import { completedAction, editAction } from '../constants';

const SingleTodo: FC<ISingleTodoProps> = ({
  todo,
  updateHandler,
  editHandler
}): ReactElement => {
  return (
    <div>
      <p>
        {todo.title}
        <span onClick={() => updateHandler(todo, completedAction)}>
          {todo.completed ? '✅' : '❌'}
        </span>
        <span onClick={() => editHandler(todo, editAction)}>✏️</span>
      </p>
      <p>{todo.description}</p>
    </div>
  );
};

export default SingleTodo;
