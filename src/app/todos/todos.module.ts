import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { TodosService } from './services/todos.service';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [{ path: '', component: TodosComponent }];
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    TodosComponent,
    TodoComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [TodosService],
})
export class TodosModule {}
