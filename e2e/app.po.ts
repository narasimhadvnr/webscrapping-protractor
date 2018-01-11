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

    // browser.sleep(10000);
    element.all(by.css('.file-list .docs-tabstrip li a')).then(function(items) {

      // items.filter((item) => (item !== ''));
      for (let i = 0; i < items.length; i++) {
          items[i].getText().then(result => {
            if (result.length > 0) {
              console.log(result);
              items[i].click().then(() => {});
              browser.sleep(2000);
            }
          });
      }
      browser.sleep(5000);
      //  items[i].getText().then(result => {
      //    console.log( result);
      //    fs.writeFile('content.ts', result, function (err) {
      //     if (err) throw err;
      //     console.log('Saved!');
      //   });
      //  });

    });

    // for (let i=0; i<fileTabstripLists.count(); i++){

    // }
  }

}

