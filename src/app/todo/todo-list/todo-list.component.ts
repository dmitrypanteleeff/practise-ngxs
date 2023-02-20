import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Select, Store } from '@ngxs/store';
import { AddItemAction, ToggleItemAction } from '../todo.actions';
import { TodoModel } from '../types/todo';
import { Observable } from 'rxjs';
import { TooSelectors } from '../todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

@Select(TooSelectors.todoItems) todoItems$!: Observable<TodoModel[]>

  newItemName!: string;
  items: TodoModel[] = [...new Array(10)].map((_, index) => ({
    id: index + 1,
    isDone: false,
    title: `Todo ${index + 1}`,
  }));

  constructor( private _store: Store){}

  trackById(index: number, item: TodoModel): number {
    return item.id;
  }

  toggleItem(todoItem: TodoModel) {
    this._store.dispatch(new ToggleItemAction(todoItem.id));
    // const foundTodo = this.items.find((it) => todoItem.id === it.id);
    // if (foundTodo) {
    //   foundTodo.isDone = !foundTodo.isDone;
    // }
  }

  addItem() {

    this._store.dispatch(new AddItemAction(this.newItemName));

    if (!this.newItemName) {
      return;
    }

    // this.items = [
    //   ...this.items,
    //   {
    //     id: Math.round(Math.random() * 1000),
    //     isDone: false,
    //     title: this.newItemName,
    //   },
    // ];
    this.newItemName = '';
  }
}
