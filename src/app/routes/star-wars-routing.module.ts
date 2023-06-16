import { Routes } from '@angular/router';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { CharactersComponent } from '../components/characters/characters.component';

export const StarWarsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'characters',
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'character/:uid',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../components/character-details/character-details.component'
          ).then((m) => m.CharacterDetailsComponent),
      },
      {
        path: 'planet/:pid',
        loadComponent: () =>
          import('../components/planet-details/planet-details.component').then(
            (m) => m.PlanetDetailsComponent
          ),
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '/not-found' },
];
