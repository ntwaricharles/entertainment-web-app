import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  loadMovies,
  loadMoviesSuccess,
  loadMoviesFailure,
} from './movie.actions';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() =>
        this.http.get<any[]>('/data.json').pipe(
          map((movies) => loadMoviesSuccess({ movies })),
          catchError((error) => of(loadMoviesFailure({ error: error.message })))
        )
      )
    )
  );
}
