import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  CharacterDetailsResponse,
  CharactersTableList,
  PlanetDetailsResponse,
} from 'src/app/models';

export const GET_CHARACTERS_REQUESTS_SUCCESS = createAction(
  '[Characters Api] GET_CHARACTERS_REQUESTS_SUCCESS',
  props<{ pageNo: number; characters: CharactersTableList }>()
);
export const GET_CHARACTERS_REQUESTS_FAILURE = createAction(
  '[Characters Api] GET_CHARACTERS_REQUESTS_FAILURE',
  props<{ pageNo: number; error: HttpErrorResponse }>()
);

export const GET_CHARACTER_DETAILS_REQUEST_SUCCESS = createAction(
  '[Character Details Api] GET_CHARACTER_DETAILS_REQUEST_SUCCESS',
  props<{ details: CharacterDetailsResponse }>()
);
export const GET_CHARACTER_DETAILS_REQUEST_FAILURE = createAction(
  '[Character Details Api] GET_CHARACTER_DETAILS_REQUEST_FAILURE',
  props<{ error: HttpErrorResponse }>()
);

export const GET_PLANET_DETAILS_REQUEST_SUCCESS = createAction(
  '[Planet Details Api] GET_PLANET_DETAILS_REQUEST_SUCCESS',
  props<{ details: PlanetDetailsResponse }>()
);
export const GET_PLANET_DETAILS_REQUEST_FAILURE = createAction(
  '[Planet Details Api] GET_PLANET_DETAILS_REQUEST_FAILURE',
  props<{ error: HttpErrorResponse }>()
);
