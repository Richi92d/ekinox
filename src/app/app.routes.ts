import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'movie-list',
      loadComponent: () => import('./components/films/film-list/film-list.component').then(m => m.FilmListComponent)
    },
    {
      path: '',
      redirectTo: '/movie-list',
      pathMatch: 'full'
    }
  ];