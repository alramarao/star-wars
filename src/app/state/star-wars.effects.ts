import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { StarWarsApiActions, StarWarsPageActions } from './actions';
import { StarWarsService } from '../services/star-wars.service';

@Injectable()
export class StarWarsEffects {
	constructor(private actions$: Actions, private starService: StarWarsService) {}

	getCharacters$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(StarWarsPageActions.GET_CHARACTERS_REQUEST),
			switchMap(payload =>this.starService.getCharacters(payload.pageNo, payload.limit)
					.pipe(
						map(characters => StarWarsApiActions.GET_CHARACTERS_REQUESTS_SUCCESS({ pageNo: payload.pageNo, characters })
						),
						catchError(error => of(StarWarsApiActions.GET_CHARACTERS_REQUESTS_FAILURE({ pageNo: payload.pageNo, error }))
						)
					)
			)
		);
	});

	getCharacterDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(StarWarsPageActions.GET_CHARACTER_DETAILS_REQUEST),
			switchMap(payload =>this.starService.getCharacterDetails(payload.uId)
					.pipe(
						map(details => StarWarsApiActions.GET_CHARACTER_DETAILS_REQUEST_SUCCESS({ details })
						),
						catchError(error => of(StarWarsApiActions.GET_CHARACTER_DETAILS_REQUEST_FAILURE({ error }))
						)
					)
			)
		);
	});
	
	getPlanetDetails$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(StarWarsPageActions.GET_PLANET_DETAILS_REQUEST),
			switchMap(payload =>this.starService.getPlanetDetails(payload.pId)
					.pipe(
						map(details => StarWarsApiActions.GET_PLANET_DETAILS_REQUEST_SUCCESS({ details })
						),
						catchError(error => of(StarWarsApiActions.GET_PLANET_DETAILS_REQUEST_FAILURE({ error }))
						)
					)
			)
		);
	});
}
