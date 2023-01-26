import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { FilterEnum } from '../../models/filter.enum';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  //$ means that is a stream
  visibleTodo$: Observable<Todo[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodoSelected$: Observable<boolean>;
  editingId: string | null = null;
  constructor(private todoServic: TodosService) {
    //combine two streams ,use pipe becouse it is arcticture for rxjs
    this.visibleTodo$ = combineLatest(
      this.todoServic.todos$,
      this.todoServic.filter$
    ).pipe(
      map(([todos, filter]: [Todo[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
    //no visible todos
    this.noTodoClass$ = this.todoServic.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    //every return true if every element match the condition
    //if every element has property isCompleted=true then isAllTodoSelected$ will be true
    this.isAllTodoSelected$ = this.todoServic.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
  }
  //mark all todos is selected
  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoServic.toggleAll(target.checked);
  }
  //edit
  setEditID(editingId: string | null): void {
    this.editingId = editingId;
    // console.log(editingId);
  }
}
