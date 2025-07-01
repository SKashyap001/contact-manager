import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ContactListComponent }
    ])
  ]
};