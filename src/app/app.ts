import { Component, signal } from '@angular/core';
import { UserCard } from './user-card/user-card';
import { ItemList } from './item-list/item-list';

@Component({
  selector: 'app-root',
  imports: [UserCard, ItemList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-coursera');
}
