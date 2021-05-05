import { Browser } from 'puppeteer';
import { Page } from 'puppeteer';
import { baseCrawler } from './baseCrawler';
import { transmitter } from '../tranmitter';
import * as Type from '../../types';
import selector from './comicSelector';
import { ComicList } from './comicList';
import { Utils } from '../utils/index';
import { LogMessages } from '../logger';

export default class comicCrawler extends baseCrawler {
  protected async crawl(_: Browser, page: Page) {
    const url = 'https://manga1000.com/';
    await page.goto(url, { waitUntil: 'networkidle0' });
    for (let comic of ComicList) {
      this.logger.info(LogMessages.Info.処理開始(comic.title));
      //対象漫画の検索
      await this.search(page, comic);
      //対象漫画の詳細ページ収集
      await this.crawlDetail(page, comic)
      this.logger.info(LogMessages.Info.処理終了(comic.title));
    }
    this.logger.debug('ScrapedData',this.scrapedData);
  }

  private async search(page: Page, comic: Type.comicInfo): Promise<void> {
    //対象漫画の検索
    await page.type(selector.searchForm, comic.title);
    //検索ボタンのクリック
    await Promise.all([
      page.click(selector.searchBtn),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
    //対象漫画の詳細ページ移動
    await Promise.all([
      page.click(selector.linkDetailPage.replace('_ID', String(comic.id))),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
  }

  private async crawlDetail(page: Page, comic: Type.comicInfo): Promise<void> {
    await this.fetch(page, comic)
      .then(async (data) => {
        //登録APIへリクエスト
        await transmitter.sendScrapedData(data);
        return data;
      })
      .then((data) => {
        this.scrapedData.push(data)
      })
  }

  private async fetch(page: Page, comic: Type.comicInfo): Promise<Type.ScrapedData> {
    this.logger.info(LogMessages.Info.処理中(comic.title))
    const detailPageUrl = page.url();
    const targetSelector = selector.newChapterInfo.replace('_ID', String(comic.id));
    const newChapter = await page.$(targetSelector);
    //TODO:クラスにするかメソッド化する
    const chapterTitle = await page.evaluate(elm => elm.textContent, newChapter);
    //TODO:ページにアクセスしなくてもhrefURLを取得できるようにする
    await Promise.all([
      page.click(targetSelector),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 })
    ]);
  
    return {
      title:        comic.title,
      comicNo:      comic.id,
      comicUrl:     detailPageUrl,
      chapterNo:    Utils.fetchNumber(chapterTitle),
      chapterUrl:   page.url(),
      chapterTitle: chapterTitle
    }
  }
}

new comicCrawler().run();