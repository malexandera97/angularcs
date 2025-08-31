import { Routes } from '@angular/router';
import { UserCard } from './user-card/user-card';
import { ItemList } from './item-list/item-list';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: UserCard, canActivate: [AuthGuard] },
  { path: 'items', component: ItemList, canActivate: [AuthGuard] }
];
