// src/app/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieState } from '../../store/movie.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  bookmarks$: Observable<string[]>;

  // Add the missing properties
  isMenuOpen = false;

  constructor(private store: Store<{ movie: MovieState }>) {
    this.bookmarks$ = this.store.select((state) => state.movie.bookmarks);
  }

  // Add the missing toggleMenu method
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
