import { bootstrapApplication } from '@angular/platform-browser';
import { StarWarsComponent } from './app/pages/star-wars/star-wars.component';

bootstrapApplication(StarWarsComponent, { providers: [] }).catch((err) =>
  console.error(err)
);
