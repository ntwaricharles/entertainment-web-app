import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';
import { Movie } from '../../models/movie.model'; 

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies$: Observable<Movie[]>; 
  filteredMovies$: Observable<Movie[]>; 
  searchQuery: string = ''; 

  constructor(private store: Store) {
    this.movies$ = this.store.select(selectAllMovies);
    this.filteredMovies$ = this.movies$;
  }

  ngOnInit(): void {
    this.filterMovies(); 
  }

  filterMovies() {
    this.filteredMovies$ = this.movies$.pipe(
      map((movies) =>
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    );
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterMovies();
  }
}
