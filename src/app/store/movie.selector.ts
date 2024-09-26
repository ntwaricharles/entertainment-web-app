import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectAllMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies
);

export const selectMoviesLoading = createSelector(
  selectMovieState,
  (state: MovieState) => state.loading
);

export const selectMoviesError = createSelector(
  selectMovieState,
  (state: MovieState) => state.error
);
