import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ClickTrackerDirective } from '../click-tracker';

@Component({
  selector: 'app-animated-card',
  imports: [CommonModule, ClickTrackerDirective],
  templateUrl: './animated-card.html',
  styleUrl: './animated-card.css',
  animations: [
    trigger('cardState', [
      state('inactive', style({
        transform: 'scale(1)',
        backgroundColor: '#f8f9fa'
      })),
      state('active', style({
        transform: 'scale(1.05)',
        backgroundColor: '#007bff',
        color: 'white'
      })),
      transition('inactive <=> active', animate('300ms ease-in-out'))
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class AnimatedCard {
  isActive = false;
  showDetails = false;
  clickCount = 0;

  toggleState() {
    this.isActive = !this.isActive;
    this.clickCount++;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
