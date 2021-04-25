import { Browser } from 'puppeteer';
import { Page } from 'puppeteer';
import { baseCrawler } from './baseCrawler';
import { ScrapedData } from './types';
import selector from './comicSelector';
import ComicList from './comicList';
import { Utils } from '../utils/index';
// const options = { headless: true }

export default class comicCrawler extends baseCrawler {
  protected async crawl(_: Browser, page: Page) {
    console.log('============start=============');
    const url = 'https://manga1000.com/';
    await page.goto(url, { waitUntil: 'networkidle0' });
    for (let comic of ComicList) {
      await this.search(page, comic)
      await this.crawlDetail(page, comic)
    }
    console.log("===========ScrapedData===============");
    console.log(this.scrapedData);
    console.log('============end=============');
  }

  private async search(page: Page, comic: any): Promise<void> {
    //対象漫画の検索
    await page.type(selector.searchForm, comic.title);
    //検索ボタンのクリック
    await Promise.all([
      page.click(selector.searchBtn),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
    //対象漫画の詳細ページ移動
    await Promise.all([
      page.click(selector.linkDetailPage.replace('_ID', comic.id)),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
  }

  private async crawlDetail(page: Page, comic: any): Promise<void> {
    await this.fetch(page, comic)
      .then(async (d) => this.scrapedData.push(d));
  }

  private async fetch(page: Page, comic: any): Promise<ScrapedData> {
    const detailPageUrl = page.url();
    const targetSelector = selector.newChapterInfo.replace('_ID', comic.id);
    const newChapter = await page.$(targetSelector);
    //TODO:クラスにするかメソッド化する
    const chapterTitle = await page.evaluate(elm => elm.textContent, newChapter);
    console.log("============text==============");
    console.log(chapterTitle);
    await Promise.all([
      page.click(targetSelector),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
  
    return {
      title: comic.title,
      comicUrl: detailPageUrl,
      chapterNum: Utils.fetchNumber(chapterTitle),
      chapterUrl: page.url(),
      chapterOrg: chapterTitle
    }
  }
}

new comicCrawler().run();