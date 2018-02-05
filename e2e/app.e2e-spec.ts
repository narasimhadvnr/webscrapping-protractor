import { AppPage } from './app.po';

describe('webscrapping-protractor App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

//   it('should click viewsource tab elements', () => {
//     page.navigateTo('https://www.telerik.com/kendo-angular-ui/components/grid/scroll-modes/');
//  //   expect(page.getParagraphText()).toEqual('Welcome to app!');
//     page.sleepBrowser(3000);
//   });

  it('should display welcome message', () => {
   page.navigateTo('https://www.telerik.com/kendo-angular-ui/components/grid/scroll-modes/');
//   page.clickViewSourceElements();
   
 //   expect(page.getParagraphText()).toEqual('Welcome to app!');
    page.gettabstripElement('scroll_modes');

    page.sleepBrowser(20000);
  });
});
