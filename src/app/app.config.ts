import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { itemReducer } from './store/item.reducer';
import { trackingReducer } from './store/tracking.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(), 
    provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideStore({
      items: itemReducer,
      tracking: trackingReducer
    }),
    provideStoreDevtools()
  ]
};
