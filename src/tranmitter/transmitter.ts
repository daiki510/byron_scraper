import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ScrapedData, apiResponse } from '../../types';
import  { ApiURIs } from './';
import { Logger, LogMessages } from '../logger';

export default class Transmitter {
  private client: AxiosInstance;
  private logger: Logger;

  //TODO:API認証
  //TODO:レスポンスに対しても型定義する検討
  constructor() {
    this.client = axios.create({
      baseURL: 'http://127.0.0.1:10080/api',
      timeout: 180000,
      headers: {
        ContentType: 'application/json',
        // Authorization: 'Bearer ' + 'YOUR_API_KEY',
      },
      responseType: 'json'
    }),
    this.logger = Logger.build();
  }

  async sendScrapedData(
    payload: ScrapedData
  ): Promise<apiResponse> {
    //TODO:例外処理を入れる(型にvoidを追加するとレスポンスに対する処理がうまくいかない)
    const res = await this.client.post(ApiURIs.COMIC, payload)
      .then((res) => {
        this.logger.info(LogMessages.Info.成功('APIリクエスト', res.status))
        return {
          status: res.status,
          chapterTitle: res.data['chapter_title'],
          chapterUrl: res.data['chapter_url']
        }
      })
    return res
  }
}
