import { NgGalleryPage } from './app.po';

describe('ng-gallery App', function() {
  let page: NgGalleryPage;

  beforeEach(() => {
    page = new NgGalleryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
