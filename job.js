const puppeteer = require('puppeteer');

module.exports = async function run() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
    const page = await browser.newPage();

    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) Gecko/20100101 Firefox/28.0)');

    await page.goto('http://apps.land.gov.il/PirsumMichrazim/aspx/Search.aspx');
    await page.waitForSelector('#yeud');

    await page.select('#yeud', '1');
    await page.select('#yeshuv', '2620');
    const button = await page.$("a[href='javascript:submitForm();']");
    await button.click();

    await page.waitForSelector('#tblResults', {
      timeout: 2000,
    });

    console.log('There is results!'); // TODO: send email
  } catch (e) {
    throw new Error('No results');
  }
};
