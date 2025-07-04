export interface ITodo {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  createdAt: string;
}
export interface IGetTodoResponse {
  todos: ITodo[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
export interface ITodoStore {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  updateTodo: (updatedTodo: ITodo) => void;
  deleteTodo: (id: number) => void;
}
export type NewTodo = Omit<ITodo, 'id' | 'createdAt'>;
