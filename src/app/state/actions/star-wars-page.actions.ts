import { createAction, props } from '@ngrx/store';
import { StarWarsState } from '../star-wars.reducer';

export const resetStateField = createAction(
	'[Star Wars App] Reset state field',
	(field: keyof StarWarsState) => ({ field })
);

export const GET_CHARACTERS_REQUEST = createAction(
	'[Characters Page] GET_CHARACTERS_REQUEST',
	props<{ pageNo: number, limit: number }>()
);

export const GET_CHARACTER_DETAILS_REQUEST = createAction(
	'[Character Details Page] GET_CHARACTER_DETAILS_REQUEST',
	props<{ uId: string }>()
);

export const GET_PLANET_DETAILS_REQUEST = createAction(
	'[Planet Details Page] GET_PLANET_DETAILS_REQUEST',
	props<{ pId: string }>()
);