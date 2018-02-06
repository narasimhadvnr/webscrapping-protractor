import { AppPage } from './app.po';

describe('webscrapping-protractor App', () => {
  let page: AppPage = new AppPage();

  beforeEach(() => {
    // page = new AppPage();
  });

//   it('should click viewsource tab elements', () => {
//  //   expect(page.getParagraphText()).toEqual('Welcome to app!');
//    const url = 'https://www.telerik.com/kendo-angular-ui/components/buttons/button';
//     page.navigateTo(url);
//     page.clickViewSourceElements();
//     page.sleepBrowser(3000);
//   });

  it('should display welcome message', () => {
   // const url = 'https://www.telerik.com/kendo-angular-ui/components/grid/scroll-modes';
    const url = 'https://www.telerik.com/kendo-angular-ui/components/buttons/button';
    page.navigateTo(url);
   const FOLDER_NAME =  url.slice(52);
   const PARTS = url.slice(52).split('/');
   let componentName = '';
   if (PARTS.length === 2) {
    componentName = PARTS[1];
   } else if (PARTS.length === 1) {
      componentName = PARTS[0];
   }
     page.gettabstripElement(FOLDER_NAME, componentName);

    page.sleepBrowser(20000);
  });
});
