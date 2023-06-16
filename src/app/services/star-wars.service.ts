import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  CharacterDetailsResponse,
  CharactersTableList,
  PlanetDetailsResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getCharacters(pageNo: number, limit: number): Observable<CharactersTableList> {
    const params = new HttpParams()
      .set('page', String(pageNo + 1))
      .set('limit', String(limit));
    return this.httpClient.get<CharactersTableList>('api/people', { params });
  }

  getCharacterDetails(uId: string): Observable<CharacterDetailsResponse> {
    return this.httpClient.get<CharacterDetailsResponse>(`api/people/${uId}`);
  }

  getPlanetDetails(pId: string): Observable<PlanetDetailsResponse> {
    return this.httpClient.get<PlanetDetailsResponse>(`api/planets/${pId}`);
  }
}
