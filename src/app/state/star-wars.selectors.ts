import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StarWarsState } from './star-wars.reducer';

export const selectStarWarsFeature =
  createFeatureSelector<StarWarsState>('starWars');

export const getCharactersList = createSelector(
  selectStarWarsFeature,
  (state) => (!state.isLoadingData ? state.characters.results : undefined)
);
export const getNumberOfCharacters = createSelector(
  selectStarWarsFeature,
  (state) => state.characters.total_records
);
export const getTotalPages = createSelector(
  selectStarWarsFeature,
  (state) => state.characters.total_pages
);
export const getPageNo = createSelector(
  selectStarWarsFeature,
  (state) => state.characters.pageNo
);

export const getCharacterDetails = createSelector(
  selectStarWarsFeature,
  (state) => state.characterDetails
);

export const getPlanetDetails = createSelector(
  selectStarWarsFeature,
  (state) => state.planetDetails
);
