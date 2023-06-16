import { bootstrapApplication } from '@angular/platform-browser';
import { StarWarsComponent } from './app/pages/star-wars/star-wars.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from './app/interceptors/api-interceptor.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { StarWarsEffects, StarWarsReducer } from './app/state';
import { provideRouter } from '@angular/router';
import { StarWarsRoutes } from './app/routes/star-wars-routing.module';

bootstrapApplication(StarWarsComponent, {
  providers: [
    provideRouter(StarWarsRoutes),
    provideHttpClient(withInterceptors([ApiInterceptor])),
    provideStore({ starWars: StarWarsReducer }),
    provideEffects(StarWarsEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
}).catch((err) => console.error(err));
