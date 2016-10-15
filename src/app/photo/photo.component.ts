import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from '../shared/models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @Input() photo: Photo;
  @Output() deleter = new EventEmitter<number>();
  @Output() slider = new EventEmitter<Photo>();

  deletePhoto({id}): void {
    this.updateLocalStorage(id);
    this.deleter.emit(id);
  }

  private updateLocalStorage(id: number): void {
    let blackList = JSON.parse(window.localStorage.getItem('blacklist') || "{}");
    blackList[id] = true;
    window.localStorage.setItem('blacklist', JSON.stringify(blackList));
  }

  startSlideShow(photo: Photo): void {
    this.slider.emit(photo);
  }

}
