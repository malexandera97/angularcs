import { Routes } from '@angular/router';
import { UserCard } from './user-card/user-card';
import { ItemList } from './item-list/item-list';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UserCard },
  { path: 'items', component: ItemList }
];
