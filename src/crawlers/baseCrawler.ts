import puppeteer, { Browser, Page } from 'puppeteer';
import { ScrapedData } from './types';
import { options } from '../LaunchOption';
const screenSize = {
    width: 1920,height: 1080
};

export abstract class baseCrawler {
    protected scrapedData: ScrapedData[] = [];
    
    async run(): Promise<void> {
        console.log('============start_base=============')
        const browser = await puppeteer.launch(options);
        try {
            const _page = await browser.newPage();
            await _page.setViewport(screenSize);
            await this.crawl(browser, _page);
        } catch (error) {
            console.log('============error=============')
            console.log(error)
        } finally {
            await browser.close();
        }
        console.log('============end_base=============')
    }

    protected abstract crawl(browser: Browser, page: Page): any;
}