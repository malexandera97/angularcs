import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ItemState } from './item.state';

export const selectItemState = createFeatureSelector<ItemState>('items');

export const selectItems = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);
