import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FC,
  type FormEvent,
  type SetStateAction
} from 'react';
import type { ITodo, NewTodo } from '../types/todos';
import axios from 'axios';

const TodoForm: FC<{
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setForceRefresh: Dispatch<SetStateAction<boolean>>;
}> = ({ page, setPage, setForceRefresh }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const formSubmitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!title.trim().length || !description.trim().length) {
      setIsError(true);
      return;
    }
    const newTodo: NewTodo = {
      title,
      description,
      completed: false,
      date: new Date().toISOString()
    };
    try {
      const { status } = await axios.post<ITodo>(
        `${import.meta.env.VITE_BASE_API}/todos`,
        newTodo
      );
      if (status === 201) {
        if (page === 1) {
          setForceRefresh((prev) => !prev);
        } else {
          setPage(1);
        }
      }
      setDescription('');
      setTitle('');
    } catch (error) {
      console.log('Error in adding Todo: ', error);
      setIsError(true);
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        required
      />
      <button type="submit">Add Todo</button>
      {isError && (
        <p style={{ color: 'red' }}>* Please add title and description *</p>
      )}
    </form>
  );
};

export default TodoForm;
