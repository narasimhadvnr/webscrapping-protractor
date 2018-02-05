import { browser, by, element, protractor, ExpectedConditions } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';
import { Utilities } from './utilities';
const fs = require('fs');
const mkdirp = require('mkdirp');


export class AppPage {
  navigateTo(url) {
    browser.waitForAngularEnabled(false);
    return browser.get(url);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }


  clickViewSourceElements() {
    element.all(by.css('a')).then(function (items) {
      for (let i = 0; i < items.length; i++) {
        items[i].getText().then((text) => {
          // console.log('text: ', text);
          if (text.trim().toLowerCase() === 'view source') {
            browser.actions().mouseMove( items[i]).click();
            browser.actions().mouseDown().mouseUp().perform();
            console.log('item found with view source');
          }
        });
      }
    });
  }

  sleepBrowser(duration) {
    browser.sleep(duration);
  }

  gettabstripElement(componentName) {
    const FOLDER_NAME = 'code_';
    element.all(by.css('.file-list')).then(function(items) {
      for (let i = 0; i < items.length; i++) {
        const folderName = __dirname + '/' + componentName + '/' + FOLDER_NAME + i;
        mkdirp(folderName, () => {
          items[i].all(by.css('.docs-tabstrip li a')).then( (fileNames) => {
            for (let anchor = 0; anchor < fileNames.length; anchor ++) {
            fileNames[anchor].getText().then(result => {
              if (result.length > 0) {
                // browser.actions().mouseMove(fileNames[anchor]).click();
                fileNames[anchor].click().then(() => {
                  
                });
                browser.actions().mouseDown().mouseUp().perform();
                // browser.sleep(2000);
                 items[i].element(by.css('.tab-content')).getText().then( (code) => {
                  const filePath = folderName + '/' + result;
                  console.log('filePath: ', filePath, + ' code: ' + code);
                  // fs.writeFileSync(filePath, code, 'utf-8');
                 });
              }
            });
            }
          });
        });
      }
    });

  }
}

