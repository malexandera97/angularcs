import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../store/item.state';
import { selectItems } from '../store/item.selectors';
import * as ItemActions from '../store/item.actions';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  items$: Observable<Item[]>;

  constructor(private store: Store) {
    this.items$ = this.store.select(selectItems);
  }

  addItem(name: string) {
    if (name.trim()) {
      this.store.dispatch(ItemActions.addItem({ name: name.trim() }));
    }
  }

  removeItem(id: number) {
    this.store.dispatch(ItemActions.removeItem({ id }));
  }

  upvoteItem(id: number) {
    this.store.dispatch(ItemActions.upvoteItem({ id }));
  }

  downvoteItem(id: number) {
    this.store.dispatch(ItemActions.downvoteItem({ id }));
  }
}
