import { YoutubeTrendsPage } from './app.po';

describe('youtube-trends App', function() {
  let page: YoutubeTrendsPage;

  beforeEach(() => {
    page = new YoutubeTrendsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
