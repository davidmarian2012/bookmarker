import { Routes } from '@angular/router';
import { BookmarkDetailsComponent } from './features/bookmark/bookmark-details/bookmark-details.component';
import { BookmarkListComponent } from './features/bookmark/bookmark-list/bookmark-list.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/bookmark/bookmark-list/bookmark-list.component').then((m) => m.BookmarkListComponent),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
