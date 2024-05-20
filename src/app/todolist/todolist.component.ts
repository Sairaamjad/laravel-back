import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    console.log('Received todos:', this.todos);
  }

  editSelectedTodo(todo: Todo): void { 
    this.editTodo.emit(todo);
  }
   deleteTodo(user_id: number, todo: Todo): void {
    this.todoService.deleteTodo(user_id, todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    }, error => {
      console.error('Failed to delete todo:', error);
    });
  }
  
  

  // deleteAllTodo(): void {
  //   this.todoService.deleteAllTodos().subscribe(() => {
  //     this.todos = [];
  //   });
  // }


}
