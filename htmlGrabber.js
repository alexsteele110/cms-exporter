const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const util = require('util');

function parseHTML(html) {
  const $ = cheerio.load(html);

  $('img').each(function(i, ele) {
    const imgURL = $(this).attr('src');
    downloadImages(imgURL);
  });

  function downloadImages(imgURL) {
    const url = `https://hungry-hodgkin-04abc7.netlify.com${imgURL}`;
    const fileName = imgURL.slice(8);
    console.log(fileName);

    request(url).pipe(fs.createWriteStream(`images/${fileName}`));
  }
}

module.exports = {
  getHTML: async function(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    const html = await page.evaluate(
      () => document.querySelector('div.content').innerHTML
    );

    const writeFile = util.promisify(fs.writeFile);

    const htmlFile = await writeFile('content.html', html);

    parseHTML(html);
  }
};
