import { AppPage } from './app.po';

describe('webscrapping-protractor App', () => {
  let page: AppPage = new AppPage();
  const url = 'https://www.telerik.com/kendo-angular-ui/components/grid/editing/editing-reactive-forms/';

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

  // it('wait for items to appear', () => {
  //   page.navigateTo(url);
  //   console.log('testcase 1');
    
  //   page.waitforSnippetRunners();
  // });

  it('load page', () => {
    page.navigateTo(url);
    console.log('waiting for frames to load');
    page.sleepBrowser(5000);

  });
  // it('should click viewsource tab elements', () => {
  //   //   expect(page.getParagraphText()).toEqual('Welcome to app!');
  //   console.log('testcase 2');
  //   page.clickViewSourceElements();
  //   page.sleepBrowser(3000);
  // });

  it('refresh dom', () => {
    page.clickAndRefreshDom();
  });

  it('save file content', () => {
    // const url = 'https://www.telerik.com/kendo-angular-ui/components/grid/scroll-modes';
    // page.navigateTo(url);
    console.log('testcase 3');
    
    const FOLDER_NAME = url.slice(52);
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

