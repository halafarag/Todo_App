import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { FilterEnum } from '../../models/filter.enum';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  //$ means that is a stream
  visibleTodo$: Observable<Todo[]>;
  constructor(private todoServic: TodosService) {
    //combine two streams ,use pipe becouse it is arcticture for rxjs
    this.visibleTodo$ = combineLatest(
      this.todoServic.todos$,
      this.todoServic.filter$
    ).pipe(
      map(([todos, filter]: [Todo[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todos) => {
            !todos.isCompleted;
          });
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todos) => {
            todos.isCompleted;
          });
        } else console.log(todos, filter);
        return todos;
      })
    );
  }
}
