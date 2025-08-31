import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[Item] Add Item',
  props<{ name: string }>()
);

export const removeItem = createAction(
  '[Item] Remove Item',
  props<{ id: number }>()
);

export const upvoteItem = createAction(
  '[Item] Upvote Item',
  props<{ id: number }>()
);

export const downvoteItem = createAction(
  '[Item] Downvote Item',
  props<{ id: number }>()
);
