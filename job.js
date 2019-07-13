const puppeteer = require('puppeteer');
const config = require('config');

const {
  url, userAgent, timeout, puppeteer: puppeteerConfig,
} = config;

module.exports = async function run() {
  try {
    const browser = await puppeteer.launch({
      headless: puppeteerConfig.headless,
      args: puppeteerConfig.args,
    });
    const page = await browser.newPage();

    page.setUserAgent(userAgent);

    await page.goto(url);
    await page.waitForSelector('#yeud');

    await page.select('#yeud', '1');
    await page.select('#yeshuv', '2620');
    const button = await page.$("a[href='javascript:submitForm();']");
    await button.click();

    await page.waitForSelector('#tblResults', {
      timeout,
    });

    console.log('There is results!');
    // TODO: send email
  } catch (e) {
    throw new Error('No results');
  }
};
