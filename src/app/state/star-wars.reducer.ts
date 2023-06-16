import { createReducer, on } from '@ngrx/store';
import { StarWarsApiActions, StarWarsPageActions } from './actions';
import {
  CharacterDetails,
  CharactersTableList,
  PlanetDetails,
} from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { RESPONSE_OK } from '../constants/star-wars.constants';

export interface State {
  starWars: StarWarsState;
}
export interface StarWarsState {
  characters: CharactersTableList;
  isLoadingData: boolean;

  characterDetails: CharacterDetails | undefined;

  planetDetails: PlanetDetails | undefined;

  error: HttpErrorResponse | undefined;
}

const initialState: StarWarsState = {
  characters: {
    results: [],
    message: '',
    total_records: 0,
    total_pages: 0,
    previous: '',
    next: '',
    pageNo: -1,
  },
  isLoadingData: true,
  characterDetails: undefined,
  planetDetails: undefined,
  error: undefined,
};

export const StarWarsReducer = createReducer<StarWarsState>(
  initialState,

  on(StarWarsPageActions.resetStateField, (state, action): StarWarsState => {
    return {
      ...state,
      [action.field]: initialState[action.field],
    };
  }),

  on(
    StarWarsApiActions.GET_CHARACTERS_REQUESTS_SUCCESS,
    (state, action): StarWarsState => {
      return {
        ...state,
        characters:
          action.characters.message === RESPONSE_OK
            ? { ...action.characters, pageNo: action.pageNo }
            : initialState.characters,
        isLoadingData: false,
        error: initialState.error,
      };
    }
  ),
  on(
    StarWarsApiActions.GET_CHARACTERS_REQUESTS_FAILURE,
    (state, action): StarWarsState => {
      return {
        ...state,
        characters: { ...initialState.characters, pageNo: action.pageNo },
        isLoadingData: false,
        error: action.error,
      };
    }
  ),

  on(
    StarWarsApiActions.GET_CHARACTER_DETAILS_REQUEST_SUCCESS,
    (state, action): StarWarsState => {
      return {
        ...state,
        characterDetails:
          action.details.message === RESPONSE_OK
            ? action.details.result
            : initialState.characterDetails,
        error: initialState.error,
      };
    }
  ),
  on(
    StarWarsApiActions.GET_CHARACTER_DETAILS_REQUEST_FAILURE,
    (state, action): StarWarsState => {
      return {
        ...state,
        characterDetails: initialState.characterDetails,
        error: action.error,
      };
    }
  ),

  on(
    StarWarsApiActions.GET_PLANET_DETAILS_REQUEST_SUCCESS,
    (state, action): StarWarsState => {
      return {
        ...state,
        planetDetails:
          action.details.message === RESPONSE_OK
            ? action.details.result
            : initialState.planetDetails,
        error: initialState.error,
      };
    }
  ),
  on(
    StarWarsApiActions.GET_PLANET_DETAILS_REQUEST_FAILURE,
    (state, action): StarWarsState => {
      return {
        ...state,
        planetDetails: initialState.planetDetails,
        error: action.error,
      };
    }
  )
);
