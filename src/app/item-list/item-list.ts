import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList {
  items: { name: string }[] = [
    { name: 'Elemento 1' },
    { name: 'Elemento 2' }
  ];

  addItem(newItem: string) {
    if (newItem.trim()) {
      this.items.push({ name: newItem });
    }
  }
}
