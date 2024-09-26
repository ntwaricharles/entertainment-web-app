import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMovies } from '../../store/movie.actions';
import {
  selectAllMovies,
  selectMoviesLoading,
} from '../../store/movie.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies$ = this.store.select(selectAllMovies);
  loading$ = this.store.select(selectMoviesLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMovies());
  }
}
