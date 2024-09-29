import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarks$: Observable<Movie[]>;
  filteredBookmarks$: Observable<Movie[]>;
  searchQuery: string = '';
  

  constructor(private store: Store) {
    this.bookmarks$ = this.store
      .select(selectAllMovies)
      .pipe(map((movies) => movies.filter((movie) => movie.isBookmarked)));

    this.filteredBookmarks$ = this.bookmarks$;
  }

  ngOnInit(): void {
    this.filterBookmarks();
  }

  filterBookmarks() {
    this.filteredBookmarks$ = this.bookmarks$.pipe(
      map((bookmarks) =>
        bookmarks.filter((bookmark) =>
          bookmark.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    );

  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterBookmarks();
  }

  removeBookmark(bookmark: Movie) {
  }
}
