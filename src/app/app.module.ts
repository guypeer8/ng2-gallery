import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PhotoComponent } from './photo/photo.component';
import { AppService } from './services/app.service';
import { SearchComponent } from './search/search.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    PhotoComponent,
    SearchComponent,
    DropdownComponent,
    SlideshowComponent,
    SortComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
