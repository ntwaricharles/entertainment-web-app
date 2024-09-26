// src/app/pages/movies/movies.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies$: Observable<any[]>;

  constructor(private store: Store) {
    this.movies$ = this.store.select(selectAllMovies);
  }

  ngOnInit(): void {}
}
