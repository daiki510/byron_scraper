import puppeteer, { Browser, Page } from 'puppeteer';

export abstract class baseCrawler {
    private options: object;

    constructor(options: object){
        this.options = options;
    }

    async run(): Promise<void> {
        console.log('============start_base=============')
        const browser = await puppeteer.launch(this.options);
        try {
            const _page = await browser.newPage();
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