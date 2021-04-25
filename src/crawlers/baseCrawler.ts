import puppeteer, { Browser, Page } from 'puppeteer';
import { ScrapedData } from './types';
import { args } from '../LaunchOption';
const screenSize = {width: 1920, height: 1080};

export abstract class baseCrawler {
    //TODO:オプション機能は別ファイルでおこなう
    protected scrapedData: ScrapedData[] = [];
    private options = {
        headless: !args().headful,
        slowMo: args().slowMotion,
    };
    
    async run(): Promise<void> {
        console.log('============start_base=============')
        console.log(this.options)
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