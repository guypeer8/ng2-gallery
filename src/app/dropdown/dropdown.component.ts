import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() resultsPerPage: number;
  @Output() changeResults = new EventEmitter<number>();
  options: number[] = [5,10,15,20];
  showList: boolean = false;

  constructor() {}

  ngOnInit() {}

  updateResultsPerPage(option): void {
    this.changeResults.emit(option);
    this.showList = false;
  }
}
