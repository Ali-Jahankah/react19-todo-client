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
import './todoForm.css';
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
    <section className="form_section">
      <form onSubmit={formSubmitHandler} className="new_todo_form">
        <fieldset>
          <legend>Add a new Todo</legend>

          <input
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="Title"
            className="new_todo_input"
            required
          />
          <input
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="Description"
            className="new_todo_input"
            required
          />

          <button type="submit" className="new_todo_btn btn">
            Add Todo
          </button>
          {isError && (
            <p className="form_error_text">
              * Please add title and description *
            </p>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default TodoForm;
