// src/app/pages/tv-series/tv-series.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css'],
})
export class TVSeriesComponent implements OnInit {
  tvSeries$: Observable<any[]>;

  constructor(private store: Store) {
    // Filter movies that are TV Series
    this.tvSeries$ = this.store
      .select(selectAllMovies)
      .pipe(
        map((movies) =>
          movies.filter((movie) => movie.category === 'TV Series')
        )
      );
  }

  ngOnInit(): void {}
}
