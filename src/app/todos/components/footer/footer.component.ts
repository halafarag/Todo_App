import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FilterEnum } from '../../models/filter.enum';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;
  constructor(private todoServic: TodosService) {
    //no visible todos
    this.noTodoClass$ = this.todoServic.todos$.pipe(
      map((todos) => todos.length == 0)
    );
    //number of todos
    this.activeCount$ = this.todoServic.todos$.pipe(
      map((todos) => todos.filter((todos) => !todos.isCompleted).length)
    );
    //observable to save lable on it
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => ` item${activeCount !== 1 ? 's' : ''} left`)
    );
    //filteration
    this.filter$ = this.todoServic.filter$;
  }
  //filteration
  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todoServic.changFilter(filterName);
    console.log(filterName);
  }
}
