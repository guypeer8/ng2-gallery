import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  @Output() sort = new EventEmitter<string>();
  options: string[] = ['Title', 'Date'];
  showList: boolean = false;

  constructor() {}

  ngOnInit() {}

  sortBy(option: string): void {
    this.sort.emit(option);
    this.showList = false;
  }

}
