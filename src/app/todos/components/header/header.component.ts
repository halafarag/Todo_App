import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  text: string = '';
  constructor(private todoServic: TodosService) {
    this.todoServic.todos$.subscribe((todos) => {
      console.log(todos);
    });
  }
  changText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    // console.log(target.value);
  }
  addTodo() {
    console.log(this.text);
    this.todoServic.addTodo(this.text);
    //empty input after hiting enter
    this.text = ' ';
  }
}
