import { UngCliPocPage } from './app.po';

describe('ung-cli-poc App', function() {
  let page: UngCliPocPage;

  beforeEach(() => {
    page = new UngCliPocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
