import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  name: string = 'Alexander';
  description: string = 'Estudiante de Angular y Bootstrap.';
  @HostBinding('class.shadow') shadow = true;
}
