import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddItemAction, ToggleItemAction } from './todo.actions';
import { TodoModel } from './types/todo';

export interface TodoStateModel {
  items: TodoModel[]
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: []
  }
})
@Injectable()
export class TodoState {

  @Action(AddItemAction)
  addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
    const { name } = action; // присвоили name из action
    if (!name) { return; }

    const state = ctx.getState();

    const todoItem: TodoModel = {
      id: Math.floor(Math.random() * 1000),
      isDone: false,
      title: name
    }

    ctx.setState({
      ...state,
      items: [...state.items, todoItem]
    });

  }

  @Action(ToggleItemAction)
  toggleItem(ctx: StateContext<TodoStateModel>, action: ToggleItemAction) {
    const { id } = action;
    if (!id) { return; }

    const state = ctx.getState();

    const updateState = state.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone
        }
      }

      return item
    })


    ctx.setState({
      items: [...updateState]
    })

  }
}
