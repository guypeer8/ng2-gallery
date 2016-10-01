import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from '../shared/models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() photo: Photo;
  @Output() deleter = new EventEmitter<number>();
  @Output() slider = new EventEmitter<Photo>();

  constructor() {}

  ngOnInit() {}

  deletePhoto({id}): void {
    this.updateLocalStorage(id);
    this.deleter.emit(id);
  }

  private updateLocalStorage(id: number): void {
    if(window.localStorage.getItem('blacklist')) {
      let blackList = JSON.parse(window.localStorage.getItem('blacklist'));
      blackList[id] = true;
      return window.localStorage.setItem('blacklist',JSON.stringify(blackList));
    }
    let blackList = {};
    blackList[id] = true;
    window.localStorage.setItem('blacklist', JSON.stringify(blackList));
  }

  startSlideShow(photo: Photo): void {
    this.slider.emit(photo);
  }

}
