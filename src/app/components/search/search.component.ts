import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() searchQuery: string = '';
  @Output() searchQueryChange = new EventEmitter<string>(); 
  placeholderText: string = 'Search for movies and TV series';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
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

  onSearch() {
    this.searchQueryChange.emit(this.searchQuery);
  }
}
