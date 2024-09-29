// src/app/pages/movies/movies.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';
import { Movie } from '../../models/movie.model'; // Assuming you have a Movie model

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies$: Observable<Movie[]>; // Original movies list from store
  filteredMovies$: Observable<Movie[]>; // Movies after filtering
  searchQuery: string = ''; // Holds the search query

  constructor(private store: Store) {
    this.movies$ = this.store.select(selectAllMovies);
    this.filteredMovies$ = this.movies$; // Initialize filtered movies with all movies
  }

  ngOnInit(): void {
    this.filterMovies(); // Filter movies initially based on empty query
  }

  // Filter movies based on the search query
  filterMovies() {
    this.filteredMovies$ = this.movies$.pipe(
      map((movies) =>
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    );
  }

  // Update search query and filter movies
  onSearch(query: string) {
    this.searchQuery = query;
    this.filterMovies();
  }
}
