// src/app/pages/bookmarks/bookmarks.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAllMovies } from '../../store/movie.selector';
import { Movie } from '../../models/movie.model'; // Assuming you have a Movie model

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarks$: Observable<Movie[]>; // Observable for bookmarked movies
  filteredBookmarks$: Observable<Movie[]>; // Observable for filtered bookmarked movies
  searchQuery: string = ''; // Holds the search query
  

  constructor(private store: Store) {
    // Get all bookmarked movies
    this.bookmarks$ = this.store
      .select(selectAllMovies)
      .pipe(map((movies) => movies.filter((movie) => movie.isBookmarked)));

    // Initialize with all bookmarks
    this.filteredBookmarks$ = this.bookmarks$;
  }

  ngOnInit(): void {
    this.filterBookmarks(); // Filter bookmarks initially with an empty search query
  }

  // Filter bookmarks based on the search query
  filterBookmarks() {
    this.filteredBookmarks$ = this.bookmarks$.pipe(
      map((bookmarks) =>
        bookmarks.filter((bookmark) =>
          bookmark.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    );

  }

  // Update search query and filter bookmarks
  onSearch(query: string) {
    this.searchQuery = query;
    this.filterBookmarks();
  }

  // Remove bookmark logic (optional)
  removeBookmark(bookmark: Movie) {
    // Implement logic to remove bookmark
  }
}
