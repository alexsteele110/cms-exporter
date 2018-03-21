const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

function parseHTML(html) {
  const $ = cheerio.load(html);

  $('img').each(function(i, ele) {
    const imgURL = $(this).attr('src');
    downloadImages(imgURL);
  });

  function downloadImages(imgURL) {
    const url = `https://hardcore-volhard-1376cc.netlify.com${imgURL}`;
    const fileName = imgURL.slice(8);

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

    parseHTML(html);

    fs.appendFile('content.html', html, function(err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
};
