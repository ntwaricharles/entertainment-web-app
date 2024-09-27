// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadMovies } from '../../store/movie.actions';
import {
  selectAllMovies,
  selectMoviesLoading,
} from '../../store/movie.selector';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]> = this.store.select(selectAllMovies);
  trendingMovies$: Observable<Movie[]> = of([]); 
  recommendedMovies$: Observable<Movie[]> = of([]); 
  loading$ = this.store.select(selectMoviesLoading);
  searchQuery: string = ''; 

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadMovies());
    this.initializeMovieSections();
  }

  initializeMovieSections(): void {
    this.trendingMovies$ = this.movies$.pipe(
      map((movies) => movies.filter((movie) => movie.isTrending))
    );

    this.recommendedMovies$ = this.movies$.pipe(
      map((movies) => movies.filter((movie) => !movie.isTrending))
    );
  }

  getFilteredMovies(movies: Movie[] | null): Movie[] {
    if (!movies) return []; 
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
