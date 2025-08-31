import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateTrackingCount } from './store/tracking.actions';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appClickTracker]',
  standalone: true
})
export class ClickTrackerDirective implements OnInit, OnDestroy {
  @Input('appClickTracker') trackingTag: string = '';

  private clickListener?: (event: Event) => void;

  constructor(
    private elementRef: ElementRef,
    private store: Store<any>,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Suscribirse al evento de click del DOM
      this.clickListener = (event: Event) => {
        this.onElementClick(event);
      };

      this.elementRef.nativeElement.addEventListener('click', this.clickListener);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.clickListener) {
      this.elementRef.nativeElement.removeEventListener('click', this.clickListener);
    }
  }

  private onElementClick(event: Event) {
    // No trackear elementos que podrían interferir con la navegación
    const element = this.elementRef.nativeElement;
    const tagName = element.tagName.toLowerCase();

    // Evitar trackear enlaces y botones que podrían tener navegación
    if (tagName === 'a' || tagName === 'button') {
      // Solo trackear si no tiene routerLink o href
      if (element.hasAttribute('routerLink') || element.hasAttribute('href')) {
        return; // No trackear enlaces de navegación
      }
    }

    // Leer el tracking tag del elemento
    const tag = this.trackingTag || this.elementRef.nativeElement.getAttribute('data-tracking-tag') || 'default';

    console.log(`Click tracked: ${tag}`, {
      element: this.elementRef.nativeElement.tagName,
      tag: tag,
      timestamp: new Date().toISOString()
    });

    // Actualizar el contador en Redux
    this.store.dispatch(updateTrackingCount({ tag }));
  }
}
