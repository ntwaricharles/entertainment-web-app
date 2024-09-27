// src/app/components/search/search.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() searchQuery: string = ''; // For two-way binding with parent components
  @Output() searchQueryChange = new EventEmitter<string>(); // Event emitter for two-way binding
  placeholderText: string = 'Search for movies and TV series'; // Default placeholder

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Set the placeholder based on the current route
    this.router.events.subscribe(() => {
      const route = this.activatedRoute.snapshot.routeConfig?.path;
      switch (route) {
        case 'movies':
          this.placeholderText = 'Search for movies';
          break;
        case 'tv-series':
          this.placeholderText = 'Search for TV series';
          break;
        case 'bookmarks':
          this.placeholderText = 'Search your bookmarks';
          break;
        default:
          this.placeholderText = 'Search for movies and TV series';
      }
    });
  }

  // Emit the search query to parent component when input changes
  onSearch() {
    this.searchQueryChange.emit(this.searchQuery); // Emit the searchQuery value
  }
}
