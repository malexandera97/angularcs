import { Component, HostBinding, EventEmitter, Output } from '@angular/core';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-user-card',
  imports: [UserForm],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  name: string = 'Alexander';
  description: string = 'Estudiante.';
  @HostBinding('class.shadow') shadow = true;

  @Output() userClicked = new EventEmitter<string>();

  onCardClick() {
    this.userClicked.emit(this.name);
  }

  onUserFormEvent(data: any) {
    console.log('Form data received:', data);
  }
}
