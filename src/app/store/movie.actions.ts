import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction('[Movie] Load Movies');
export const loadMoviesSuccess = createAction(
  '[Movie] Load Movies Success',
  props<{ movies: any[] }>()
);
export const loadMoviesFailure = createAction(
  '[Movie] Load Movies Failure',
  props<{ error: any }>()
);
export const addBookmark = createAction(
  '[Movie] Add Bookmark',
  props<{ movieId: string }>()
);
export const removeBookmark = createAction(
  '[Movie] Remove Bookmark',
  props<{ movieId: string }>()
);
