import { createReducer, on } from '@ngrx/store';
import { ItemState, Item } from './item.state';
import * as ItemActions from './item.actions';

export const initialState: ItemState = {
  items: [
    { id: 1, name: 'Elemento 1', upvotes: 0, downvotes: 0 },
    { id: 2, name: 'Elemento 2', upvotes: 0, downvotes: 0 }
  ],
  nextId: 3
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.addItem, (state, { name }) => ({
    ...state,
    items: [...state.items, { id: state.nextId, name, upvotes: 0, downvotes: 0 }],
    nextId: state.nextId + 1
  })),
  on(ItemActions.removeItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),
  on(ItemActions.upvoteItem, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    )
  })),
  on(ItemActions.downvoteItem, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, downvotes: item.downvotes + 1 } : item
    )
  }))
);
