import { Browser } from 'puppeteer';
import { Page } from 'puppeteer';
import { baseCrawler } from './baseCrawler';
import { ScrapedData } from './types';
const options = { headless: true }
//TODO:別ファイルで管理
const comicTitle = '呪術廻戦'

export default class comicCrawler extends baseCrawler {
  protected async crawl(_: Browser, page: Page) {
    console.log('============start=============');
    const url = 'https://manga1000.com/';
    await page.goto(url, { waitUntil: 'networkidle0' });
    await this.search(page)
    await this.crawlDetail(page)

    await page.screenshot({ path: 'storage/home.png' });
    console.log('============end=============');
  }

  private async search(page: Page): Promise<void> {
    //対象漫画の検索
    await page.type(this.selector.searchForm, comicTitle);
    //検索ボタンのクリック
    await Promise.all([
      page.click(this.selector.searchBtn),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
    //対象漫画の詳細ページ移動
    await Promise.all([
      page.click(this.selector.linkDetailPage),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
  }

  private async crawlDetail(page: Page): Promise<void> {
    await this.fetch(page)
      .then(async (d) => this.scrapedData.push(d));
    console.log("===========ScrapedData===============")
    console.log(this.scrapedData)
  }

  private async fetch(page: Page): Promise<ScrapedData> {
    const detailPageUrl: string = page.url()
    const newChapter = await page.$(this.selector.newChapterInfo);
    //TODO:クラスにするかメソッド化する
    const chapterTitle: string = await page.evaluate(elm => elm.textContent, newChapter);
    console.log("============text==============");
    console.log(chapterTitle); //呪術廻戦 - Raw 【第146話】
    await Promise.all([
      page.click(this.selector.newChapterInfo),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
    return {
      title: comicTitle,
      comicUrl: detailPageUrl,
      chapterNum: 146,
      chapterUrl: page.url(),
      chapterOrg: chapterTitle
    }
  }

  private selector: {
    searchForm: string,
    searchBtn: string,
    linkDetailPage: string,
    newChapterInfo: string,
  } = {
    searchForm: '#sticky-wrapper > div > div > div.search-holder > div > form > input',
    searchBtn: '#sticky-wrapper > div > div > div.search-holder > div > form > button',
    linkDetailPage: '#post-22224',
    newChapterInfo: '#post-22224 > div > div > div > div.entry-content > div.chaplist > table > tbody > tr:nth-child(1) > td > p > a',
  };
}

new comicCrawler(options).run();