import { PagingPage } from './app.po';

describe('paging App', () => {
  let page: PagingPage;

  beforeEach(() => {
    page = new PagingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
