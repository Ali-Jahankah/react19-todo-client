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
export type NewTodo = Omit<ITodo, 'id' | 'createdAt'>;
