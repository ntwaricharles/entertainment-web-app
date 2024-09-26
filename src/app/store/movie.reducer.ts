import { createReducer, on } from '@ngrx/store';
import {
  loadMovies,
  loadMoviesSuccess,
  loadMoviesFailure,
  addBookmark,
  removeBookmark,
} from './movie.actions';

export interface MovieState {
  movies: any[];
  loading: boolean;
  error: string | null;
  bookmarks: any[];
}

export const initialState: MovieState = {
  movies: [],
  bookmarks: [],
  loading: false,
  error: null,
};

export const movieReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({ ...state, loading: true })),
  on(loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    movies,
  })),
  on(loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addBookmark, (state, { movieId }) => ({
    ...state,
    bookmarks: [...state.bookmarks, movieId],
  })),

  // Handle the 'removeBookmark' action
  on(removeBookmark, (state, { movieId }) => ({
    ...state,
    bookmarks: state.bookmarks.filter((id) => id !== movieId),
  }))
);
