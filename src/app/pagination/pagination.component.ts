import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from '../shared/models/photo';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
  export class PaginationComponent implements OnInit {
  @Input() resultsPerPage: number;
  @Input() photos: Photo[];
  @Output() paginator = new EventEmitter<number>();
  pageNumbers: number[] = [];
  currentPage: number = 1;

  ngOnInit() {
    setTimeout(() => this.createPaginationArray(), 0);
  }

  createPaginationArray(): void {
    let numOfPages: number = Math.ceil(this.photos.length / this.resultsPerPage);
    let pagesNumbersArray: number[] = [];
    for (let i = 1; i <= numOfPages; i++) {
      pagesNumbersArray.push(i);
    }
    this.pageNumbers = pagesNumbersArray;
    this.paginate();
  }

  paginate(pageNumber: number = 1): void {
    this.currentPage = pageNumber;
    let from: number = (this.currentPage - 1) * this.resultsPerPage;
    this.paginator.emit(from);
  }

  previous(): void {
    this.paginate(this.currentPage - 1);
  }

  next(): void {
    this.paginate(this.currentPage + 1);
  }

}
