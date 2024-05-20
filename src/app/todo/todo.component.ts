import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showAddTodoForm: boolean = false;
  isNewTodo: boolean = true;
  todoToEdit: Todo | null = null;
  newTodoModel: Todo = {
    id: "",
    title: '',
    description: '',
    status: '',
    user_id: ''
  };

  constructor(private todoService: TodoService, public userService: UserService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  openAddTodoForm(): void {
    this.showAddTodoForm = true;
    this.isNewTodo = true;
    this.resetNewTodoModel();
  }

  editSelectedTodo(todo: Todo): void {
    this.showAddTodoForm = true;
    this.isNewTodo = false;
    this.todoToEdit = todo;
    this.newTodoModel = { ...todo };
  }
  
  addOrEditTodo(): void {
    if (this.isNewTodo) {
      this.addTodo();
    } else {
      this.editTodo();
    }
  }
  
  editTodo(): void {
   
    if (this.todoToEdit) {
      this.todoService.editTodo(this.userService.userId, this.newTodoModel).subscribe(() => {
        this.loadTodos();
        this.showAddTodoForm = false;
        this.resetNewTodoModel();
      });
    }
  }

  addTodo(): void {
    const user_id = this.userService.userId;
    if (user_id) {
      this.newTodoModel.user_id = String(user_id);
      this.todoService.addTodo(user_id, this.newTodoModel).subscribe(() => {
        this.loadTodos();
        this.showAddTodoForm = false;
        this.resetNewTodoModel();
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  loadTodos(): void {
    const user_id = this.userService.userId;
    if (user_id) {
      this.todoService.getTodos(user_id).subscribe(response => {
        if (response.data) {
          this.todos = response.data;
        }
      }, error => {
        console.error('Failed to load todos', error);
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  private resetNewTodoModel(): void {
    this.newTodoModel = {
      id: "",
      title: '',
      description: '',
      status: '',
      user_id: ''
    };
  }
}
