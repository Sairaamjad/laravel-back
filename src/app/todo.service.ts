import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(user_id: number): Observable<{ data: Todo[] }> {
    return this.http.get<{ data: Todo[] }>(`${API_URL}/${user_id}/tasks`);
  }

  addTodo(user_id: number, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${API_URL}/${user_id}/tasks`, todo);
  }

  editTodo(user_id:number,todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${API_URL}/${user_id}/tasks/${todo.id}`, todo);
  }

  deleteTodo(user_id:number, id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${user_id}/tasks/${id}`);
  }

  // deleteAllTodos(): Observable<void> {
  //   return this.http.delete<void>(`${API_URL}/tasks`);
  // }
}
