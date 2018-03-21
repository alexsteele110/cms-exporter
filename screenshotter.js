const puppeteer = require('puppeteer');

module.exports = {
  getScreenshots: async function(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      url,
      {
        waitUntil: 'networkidle2'
      }
    );
    await page.setViewport({ width: 1200, height: 1200 });
    await page.screenshot({ path: 'desktop-screenshot.png', fullPage: true });

    await page.setViewport({ width: 500, height: 500, isMobile: true });
    await page.screenshot({ path: 'mobile-screenshot.png', fullPage: true });

    // const file1 = `${__dirname}/desktop-screenshot.png`;
    // const file2 = `${__dirname}/mobile-screenshot.png`;

    await browser.close();
  }
};
