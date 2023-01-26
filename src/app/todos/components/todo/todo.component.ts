import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: Todo | any;
  @Input('isEditing') isEditingProps: boolean | any;
  @Output('setEditID') setEditIDEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput') textInput: ElementRef | any;

  constructor(private todoService: TodosService) {}
  //edit
  editTodo(): void {
    this.setEditIDEvent.emit(this.todoProps.id);
    console.log('object');
  }
  //remove
  removeTodo(): void {
    this.todoService.removeTodo(this.todoProps.id);
    console.log('removeTodo');
  }
  //
  toggleTodo(): void {
    this.todoService.toggleTodo(this.todoProps.id);
    console.log('toggleTodo');
  }
  //
  changText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changText');
  }
  //set id=null when we close edit mode
  changTodo() {
    console.log('changTodo', this.editingText);
    this.todoService.changTodo(this.todoProps.id, this.editingText);
    this.setEditIDEvent.emit(null);
  }
  ngOnInit(): void {
    //when double click see text for todo to edit on it
    this.editingText = this.todoProps.text;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
    console.log('changes', changes);
  }
}
