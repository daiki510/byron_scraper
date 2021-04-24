import puppeteer, { Browser, Page } from 'puppeteer';
import { ScrapedData } from './types';
const screenSize = {width: 1920, height: 1080};

export abstract class baseCrawler {
    //TODO:オプション機能は別ファイルでおこなう
    private options: object;
    protected scrapedData: ScrapedData[] = [];

    constructor(options: object){
        this.options = options;
    }

    async run(): Promise<void> {
        console.log('============start_base=============')
        const browser = await puppeteer.launch(this.options);
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