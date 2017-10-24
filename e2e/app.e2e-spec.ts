import { EvePage } from './app.po';

describe('eve App', function() {
  let page: EvePage;

  beforeEach(() => {
    page = new EvePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
