import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bookmarks',
  },
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./features/bookmark/bookmark-list/bookmark-list.component').then((m) => m.BookmarkListComponent),
  },
  {
    path: 'bookmarks/add',
    loadComponent: () =>
      import('./features/bookmark/bookmark-form/bookmark-form.component').then((m) => m.BookmarkFormComponent),
  },
  {
    path: 'bookmarks/edit/:id',
    loadComponent: () =>
      import('./features/bookmark/bookmark-form/bookmark-form.component').then((m) => m.BookmarkFormComponent),
  },

  {
    path: '**',
    redirectTo: 'bookmarks',
  },
];
