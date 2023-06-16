import { bootstrapApplication } from '@angular/platform-browser';
import { StarWarsComponent } from './app/pages/star-wars/star-wars.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from './app/interceptors/api-interceptor.service';

bootstrapApplication(StarWarsComponent, {
  providers: [provideHttpClient(withInterceptors([ApiInterceptor]))],
}).catch((err) => console.error(err));
