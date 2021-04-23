import { Browser } from 'puppeteer';
import { Page } from 'puppeteer';
import { baseCrawler } from './baseCrawler';
const options = { headless: true }

export default class TestCrawler extends baseCrawler {
  protected async crawl(_: Browser, page: Page) {
    console.log('============start=============');
    const url = 'https://google.com/';
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'storage/home.png' });
    console.log('============end=============');
  }
}

new TestCrawler(options).run();