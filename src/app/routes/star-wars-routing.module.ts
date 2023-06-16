import { Routes } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
export const StarWarsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  { path: '**', redirectTo: '/not-found' },
];
