import puppeteer, { Browser, Page } from 'puppeteer';
import { Logger, LogMessages } from '../logger';
import { ScrapedData, NotifyData } from '../../types';
import { options } from '../LaunchOption';
const screenSize = {
    width: 1920,height: 1080
};

export abstract class baseCrawler {
    protected scrapedData: ScrapedData[] = [];
    protected notifyData: NotifyData[] = [];
    protected logger: Logger;

    constructor() {
        this.logger = Logger.build();
    }
    
    async run(): Promise<void> {
        this.logger.info(LogMessages.Info.処理開始('漫画サイト'))
        const browser = await puppeteer.launch(options);
        try {
            const _page = await browser.newPage();
            await _page.setViewport(screenSize);
            await this.crawl(browser, _page);
            //TODO:LINEへ通知
            console.log("=========this.notifyData=========")
            console.log(this.notifyData)
        } catch (error) {
            this.logger.error({
                msg: LogMessages.Error.異常終了,
                detail: error,
            })
        } finally {
            await browser.close();
        }
        this.logger.info(LogMessages.Info.処理終了('漫画サイト'))
    }

    protected abstract crawl(browser: Browser, page: Page): any;
}