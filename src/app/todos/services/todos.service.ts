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
  //toggel all
  toggleAll(isCompleted: boolean): void {
    console.log(isCompleted);
    const updateTodo = this.todos$.getValue().map((todo) => {
      return { ...todo, isCompleted };
    });
    console.log(updateTodo);
    this.todos$.next(updateTodo);
  }
  //filter
  changFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }
  //put new text after editing in the input
  //find todo by id and ubdated
  changTodo(id: string, text: string): void {
    const updateTodo = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });

    this.todos$.next(updateTodo);
    console.log(updateTodo);
  }
  //delete
  removeTodo(id: string): void {
    const updateTodo = this.todos$.getValue().filter((todo) => todo.id !== id);
    this.todos$.next(updateTodo);
  }
  //toggle
  toggleTodo(id: string): void {
    const updateTodo = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    console.log(updateTodo);
    this.todos$.next(updateTodo);
  }
}
