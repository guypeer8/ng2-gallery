import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { AppService } from './services/app.service';
import { Photo } from './shared/models/photo';

@Component({
  selector: 'app-root',
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  feed: string = 'data.json';
  search: boolean = true;
  pagination: boolean = true;
  resultsPerPage: number = 10;
  sorting: boolean = true;
  autoRotate: number = 4;

  staticPhotos: Photo[] = []; // keep list of static photos
  timeout: any; // timeout variable to set and clear timeout

  constructor(public appService: AppService) {}

  @ViewChild(PaginationComponent) paginationComponent: PaginationComponent; // access to pagination component
  @ViewChild(SlideshowComponent) slideshowComponent: SlideshowComponent;

  ngOnInit() {
    this.appService.getPhotos(
      this.feed,
      (photos) => {
        this.staticPhotos = photos;
      }
    );
  }

  onPaginate(from: number): void {
    this.appService.photos = this.staticPhotos.slice(from, from + this.resultsPerPage);
  }

  onDelete(id: number): void {
    this.appService.photos = this.appService.photos.filter(photo => photo.id !== id);
  }

  onSearch(query: string): void {
    this.appService.photos = this.getCurrentView().filter(({title}) => title.toLowerCase().includes(query));
  }

  private getCurrentView(): Photo[] { // get current page view
    let from: number = (this.paginationComponent.currentPage - 1) * this.resultsPerPage;
    let currentView: Photo[] = this.staticPhotos.slice(from, from + this.resultsPerPage);
    return currentView;
  }

  onChangeResults(option: number): void {
    this.resultsPerPage = option;
    setTimeout(() => this.paginationComponent.createPaginationArray(), 0);
  }

  onSort(option: string): void {
    switch(option) {
      case('Title'):
        this.appService.photos = this.appService.photos.sort(titleSorter); // sort current page view by title
        this.staticPhotos = this.staticPhotos.sort(titleSorter); // sort generally by title
        break;
      case('Date'):
        this.appService.photos = this.appService.photos.sort(dateSorter); // sort current page view by date
        this.staticPhotos = this.staticPhotos.sort(dateSorter); // sort generally by date
        break;
      default:
            break;
    }
    // sorters
    function titleSorter(a,b) {
      return a.title > b.title ? 1 : (a.title < b.title ? -1 : 0);
    }
    function dateSorter(x,y) {
      let a = new Date(x.date);
      let b = new Date(y.date);
      return a > b ? 1 : (a < b ? -1 : 0);
    }
  }

  onSlideShow(photo: Photo): void {
    let { url, title } : { url: string, title: string } = photo;
    this.slideshowComponent.startSlideShow(url, title);
    let currentView: Photo[] = this.getCurrentView();
    let nextViewIndex: number = 0;
    for(let i=0; i<currentView.length; i++) {
      if(currentView[i].url === url) {
        if(i < currentView.length-1) {
          nextViewIndex = i+1;
        }
        this.timeout = setTimeout(() => this.onSlideShow(currentView[nextViewIndex]), this.autoRotate * 1000);
        break;
      }
    }
  }

  onStopSlideShow(): void {
    window.clearTimeout(this.timeout);
    this.slideshowComponent.isSlideShow = false;
  }

  onNextSlide(currentUrl: string): void {
    this.onSlideWalk(currentUrl, 'next');
  }

  onPreviousSlide(currentUrl: string): void {
    this.onSlideWalk(currentUrl, 'previous');
  }

  private onSlideWalk(url: string, type: string) {
    window.clearTimeout(this.timeout);
    let currentView: Photo[] = this.getCurrentView();
    if(type === 'next') {
      let nextViewIndex: number = 0;
      for(let i=0; i<currentView.length; i++) {
        if (currentView[i].url === url) {
          if (i < currentView.length - 1) {
            nextViewIndex = i + 1;
          }
          this.onSlideShow(currentView[nextViewIndex]);
          break;
        }
      }
    }
    else { // type = 'previous'
      let nextViewIndex: number = currentView.length - 1;
      for(let i=0; i<currentView.length; i++) {
        if (currentView[i].url === url) {
          if (i > 0) {
            nextViewIndex = i - 1;
          }
          this.onSlideShow(currentView[nextViewIndex]);
          break;
        }
      }
    }

  }

}
