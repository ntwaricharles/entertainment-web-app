import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';
import { Movie } from '../../models/movie.model'; 

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css'],
})
export class TVSeriesComponent implements OnInit {
  tvSeries$: Observable<Movie[]>;
  filteredTvSeries$: Observable<Movie[]>; 
  searchQuery: string = '';

  constructor(private store: Store) {
    this.tvSeries$ = this.store
      .select(selectAllMovies)
      .pipe(
        map((movies) =>
          movies.filter((movie) => movie.category === 'TV Series')
        )
      );

    this.filteredTvSeries$ = this.tvSeries$;
  }

  ngOnInit(): void {
    this.filterTvSeries();
  }

  filterTvSeries() {
    this.filteredTvSeries$ = this.tvSeries$.pipe(
      map((tvSeries) =>
        tvSeries.filter((series) =>
          series.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    );

  }
  onSearch(query: string) {
    this.searchQuery = query;
    this.filterTvSeries();
  }
}
