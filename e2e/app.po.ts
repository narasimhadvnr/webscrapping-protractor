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

    element.all(by.css('.file-list')).then(function(items) {
      for (let i = 0; i < items.length; i++) {
        items[i].all(by.css('.docs-tabstrip li a')).then( (fileNames) => {
          for (let anchor = 0; anchor < fileNames.length; anchor ++) {
          fileNames[anchor].getText().then(result => {
            if (result.length > 0) {
              fileNames[anchor].click().then(() => {});
              browser.sleep(2000);
               items[i].element(by.css('.tab-content')).getText().then( (code) => {
                console.log(result + ' ', code);
               });
            }
          });
          }
        });
      }
      browser.sleep(5000);
    });

  }
}

