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

  clickAndRefreshDom() {

    let viewSourceElements;
    const selector = '.docs-tabstrip a[href^="#code"]';
    element.all(by.css(selector)).then((elements) => {
      let elementsSize = elements.length;
      console.log('elements found:', elementsSize);
      for (let i = 0; i < elementsSize; i++) {
        viewSourceElements = element.all(by.css(selector));
        viewSourceElements.then((anchors) => {
          for (let anchor = 0; anchor < anchors.length; anchor++) {
            console.log('checking ' + anchor + ' ' + i);
            if (anchor === i) {

              browser.actions().mouseMove(anchors[anchor]).click().perform();
              browser.sleep(1000);
              anchors[anchor].click();
              console.log('Moving to item number:', anchor);
              //  anchors[anchor].click().then( ()  => {});
              browser.sleep(2000);
            }
          }
        });
      }
    });

  }

  // clickViewSourceElements() {

  //     // browser.actions().mouseMove(items[item]).click();
  //     // browser.actions().mouseDown().mouseUp().perform();
  //     // browser.sleep(10000);
  //     let viewSourceElements = element.all(by.css('.docs-tabstrip a[href^="#code"]'));
  //     viewSourceElements.then( (anchors) => {
  //       for (let anchor = 0; anchor < anchors.length; anchor++) {
  //           // anchors[anchor].click();
  //           console.log('Moving to item number:', anchor);
  //          browser.actions().mouseMove(anchors[anchor]).click().perform();
  //       //  anchors[anchor].click().then( ()  => {});
  //           browser.sleep(5000);
  //       }
  //     });
  //     browser.sleep(5000);

  // }

  // waitforSnippetRunners() {
  //   element.all( by.css('.snippet-runner')).then( (items) => {
  //     for (let item = 0; item < items.length; item++) {
  //       const until = protractor.ExpectedConditions;
  //       browser.wait(until.presenceOf(items[item]), 15000, 'Element taking too long to appear in the DOM');
  //     }

  //   } );
  // }

  sleepBrowser(duration) {
    browser.sleep(duration);
  }

  gettabstripElement(folder, componentName) {
    const FOLDER_NAME = 'code_';
    let folderId = 0;
    element.all(by.css(':not(.file-list) > .docs-tabstrip + .tab-content')).then(function (items) {

      for (let i = 0; i < items.length; i++) {
        const folderName = __dirname + '/' + folder + '/' + FOLDER_NAME + folderId ++;
        // mkdirp(folderName, () => {
        items[i].all(by.css('.file-list .docs-tabstrip li a')).then((fileNames) => {
          console.log('anchor items found: ', fileNames.length);
          for (let anchor = 0; anchor < fileNames.length; anchor++) {
            console.log('anchor fileName: ', fileNames[anchor].innerText);

            fileNames[anchor].getText().then(result => {
              console.log('inside filename result: ', result);
              if (result.length > 0) {
                browser.actions().mouseMove(fileNames[anchor]).click();
                browser.actions().mouseDown().mouseUp().perform();
                browser.sleep(2000);
                console.log('clicking on filename anchor: ');
                fileNames[anchor].click().then(() => {
                });
                browser.sleep(2000);
                items[i].element(by.css('.tab-content')).getText().then((code) => {
                  const filePath = folderName + '/' + result;
                  console.log('Writing to File: ', filePath);
                  mkdirp.sync(folderName, () => { });
                  fs.writeFileSync(filePath, code, 'utf-8');
                });
              }
            });
          }
        });

      }
    });

    // element.all(by.css(':not(.file-list) > .docs-tabstrip + .tab-content > :not(.file-list)')).then((items) => {
    //   for (let i = 0; i < items.length; i++) {
    //     const folderName = __dirname + '/' + folder + '/' + FOLDER_NAME + folderId ++;
    //     browser.sleep(2000);
    //     items[i].getText().then((code) => {
    //       const filePath = folderName + '/' + 'app.component.ts';
    //       console.log('Writing to File: ', filePath);
    //       mkdirp.sync(folderName, () => { });
    //       fs.writeFileSync(filePath, code, 'utf-8');
    //     });

    //   }
    // });
  }
}

