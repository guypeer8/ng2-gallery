import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchPhoto = new EventEmitter<string>();
  searchQuery: string = '';

  constructor() {}

  ngOnInit() {}

  search(): void {
    this.searchPhoto.emit(this.searchQuery.trim().toLowerCase());
  }

}
