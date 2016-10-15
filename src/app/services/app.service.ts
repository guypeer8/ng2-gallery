import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Photo } from '../shared/models/photo';

@Injectable()
export class AppService {
  photos: Photo[];

  constructor(private http: Http) { }

  getPhotos(feed: string, setStaticPhotosCallback): void {
    const aPromise = this.http.get(feed).map((rsp: Response) => rsp.json()).toPromise();
    aPromise
      .then(photosJSON => {
        this.photos = this.hideDeleted(photosJSON);
        setStaticPhotosCallback(this.photos);
      });
  }

  private hideDeleted(photos: Photo[]): Photo[] {
    if(window.localStorage.getItem('blacklist')) {
      let blackList = JSON.parse(window.localStorage.getItem('blacklist'));
      photos = photos.filter(({id}) => !blackList[id]);
    }
    return photos;
  }
}
