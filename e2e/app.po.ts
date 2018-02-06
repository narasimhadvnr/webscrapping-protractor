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

  clickViewSourceElements() {

      // browser.actions().mouseMove(items[item]).click();
      // browser.actions().mouseDown().mouseUp().perform();
      // browser.sleep(10000);
      let viewSourceElements = element.all(by.css('.docs-tabstrip a[href^="#code"]'));
      viewSourceElements.then( (anchors) => {
        for (let anchor = 0; anchor < anchors.length; anchor++) {
            // anchors[anchor].click();
            console.log('Moving to item number:', anchor);
           browser.actions().mouseMove(anchors[anchor]).click().perform();
        //  anchors[anchor].click().then( ()  => {});
            browser.sleep(5000);
        }
      });
      browser.sleep(5000);

  }

  waitforSnippetRunners() {
    element.all( by.css('.snippet-runner')).then( (items) => {
      for (let item = 0; item < items.length; item++) {
        const until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(items[item]), 15000, 'Element taking too long to appear in the DOM');
      }

    } );
  }

  sleepBrowser(duration) {
    browser.sleep(duration);
  }

  gettabstripElement(folder, componentName) {
    const FOLDER_NAME = 'code_';
    element.all(by.css('.file-list')).then(function(items) {
      for (let i = 0; i < items.length; i++) {
        const folderName = __dirname + '/' + folder + '/' + FOLDER_NAME + i;
        // mkdirp(folderName, () => {
          items[i].all(by.css('.docs-tabstrip li a')).then( (fileNames) => {
            for (let anchor = 0; anchor < fileNames.length; anchor ++) {
            fileNames[anchor].getText().then(result => {
              if (result.length > 0) {
                 browser.actions().mouseMove(fileNames[anchor]).click();
                 browser.actions().mouseDown().mouseUp().perform();
                 browser.sleep(2000);
                fileNames[anchor].click().then(() => {
                });
                browser.sleep(2000);
                 items[i].element(by.css('.tab-content')).getText().then( (code) => {
                  const filePath = folderName + '/' + result;
                  console.log('Writing to File: ', filePath);
                   mkdirp.sync(folderName, () => {});
                   fs.writeFileSync(filePath, code, 'utf-8');
                 });
              }
            });
            }
          });
      }
    });

  }
}

