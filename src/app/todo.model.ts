// todo.model.ts
export interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  user_id: string | number;
}