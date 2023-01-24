import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../models/filter.enum';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}
  //use behavior subject becouse it take deafult value and i can subscribe on stream of data and ubdate on it
  //************ BehaviorSubject can work as observable we can subscribe for each value !!!!!!!!!!!!  */
  todos$ = new BehaviorSubject<Todo[]>([]);
  //make all deafult value in filteration
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  addTodo(text: string): void {
    const newTodo: Todo = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    //to push all todos in array list of todos
    const updateTodo = [...this.todos$.getValue(), newTodo];
    //to update behavior subject
    this.todos$.next(updateTodo);
  }
}
