import { browser, by, element, protractor, ExpectedConditions } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';
import { Utilities } from './utilities';
const fs = require('fs');

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('https://www.telerik.com/kendo-angular-ui/components/grid/scroll-modes/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  gettabstripElement() {
    // const fileTabstripLists = element.all(by.css('file-list'));
    // // console.log('Elements found:', fileTabstripLists.count());
    // const EC = ExpectedConditions;
    // EC.visibilityOf(by.css('.file-list'));
    // fileTabstripLists.count().then( (count) => {
    //   console.log('elements found: ', count);
    // });
    // browser.sleep(10000);
    element.all(by.css('.file-list')).then(function(items) {
      console.log('Items: ', items.length);
      browser.sleep(5000);
    //  console.log(0, ' ', items[0].getText());
      // items[0].getText().then((content) => {
      //   console.log(content);
      // });
      for (let i = 0; i < items.length; i++) {
        items[0].element.all(by.css('.docs-tabstrip li')).then(
           (listItems) => {
             console.log('list items found:', listItems.length);
           }
        );
      //  items[i].getText().then(result => {
      //    console.log( result);
      //    fs.writeFile('content.ts', result, function (err) {
      //     if (err) throw err;
      //     console.log('Saved!');
      //   });
      //  });
      }
      browser.sleep(5000);

    });

    // for (let i=0; i<fileTabstripLists.count(); i++){

    // }
  }

}

