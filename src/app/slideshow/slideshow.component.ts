import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  @Output() stopSlide = new EventEmitter<void>();
  @Output() previousSlide = new EventEmitter<string>();
  @Output() nextSlide = new EventEmitter<string>();
  url: string = '';
  title: string = '';
  isSlideShow: boolean = false;

  constructor() {}

  ngOnInit() {}

  startSlideShow(urlPath: string, photoTitle: string): void {
    this.url = urlPath;
    this.title = photoTitle;
    this.isSlideShow = true;
  }

  stopSlideShow() {
    this.stopSlide.emit();
  }

  next(e){
    e.stopPropagation();
    this.nextSlide.emit(this.url);
  }

  previous(e) {
    e.stopPropagation();
    this.previousSlide.emit(this.url);
  }

}
