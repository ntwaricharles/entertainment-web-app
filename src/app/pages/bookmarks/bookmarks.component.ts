// src/app/pages/bookmarks/bookmarks.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarks$: Observable<any[]>;

  constructor(private store: Store) {
    // Filter bookmarked movies
    this.bookmarks$ = this.store
      .select(selectAllMovies)
      .pipe(map((movies) => movies.filter((movie) => movie.isBookmarked)));
  }

  ngOnInit(): void {}
}
