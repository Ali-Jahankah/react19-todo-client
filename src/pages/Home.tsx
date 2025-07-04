import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type ReactElement
} from 'react';
import { type IGetTodoResponse, type ITodo } from '../types/todos';
import { useTodoStore } from '../state/todos';
import axios from 'axios';
import TodoForm from '../components/TodoForm';

const Home: FC = (): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [forceRefresh, setForceRefresh] = useState<boolean>(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  const todos: ITodo[] = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const updateHandler = async (todo: ITodo, action?: 'completed') => {
    let updatedTodo: ITodo = todo;
    if (action === 'completed') {
      updatedTodo = { ...todo, completed: !todo.completed };
    }
    const isUpdated = await axios.put<ITodo>(
      `http://localhost:4001/api/todos/${todo.id}`,
      updatedTodo
    );
    if (isUpdated.data) {
      updateTodo(isUpdated.data);
      setEditId(null);
    }
  };
  useEffect(() => {
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
  const EditHandler = (todo: ITodo, action: 'cancel' | 'edit'): void => {
    if (action === 'edit') {
      setEditId(todo.id);
      setEditTitle(todo.title);
      setEditDescription(todo.description);
    }
    if (action === 'cancel') {
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

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
                  <div>
                    <input
                      value={editTitle}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditTitle(e.target.value)
                      }
                    />
                    <input
                      value={editDescription}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditDescription(e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateHandler({
                          ...todo,
                          title: editTitle,
                          description: editDescription
                        })
                      }
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => EditHandler(todo, 'cancel')}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    {' '}
                    <p>
                      {todo.title}{' '}
                      <span onClick={() => updateHandler(todo, 'completed')}>
                        {todo.completed ? '✅' : '❌'}
                      </span>{' '}
                      <span onClick={() => EditHandler(todo, 'edit')}>
                        {' '}
                        ✏️{' '}
                      </span>
                    </p>
                    <p>{todo.description}</p>
                  </div>
                )}
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
