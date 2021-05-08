import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ScrapedData, apiResponse } from '../../types';
import  { ApiURIs } from './';

export default class Transmitter {
  client: AxiosInstance;
  //TODO:ログ出力
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
    })
  }

  async sendScrapedData(
    payload: ScrapedData
  ): Promise<apiResponse | void> {
    const res = await this.client.post(ApiURIs.COMIC, payload)
      .then((res) => {
        return {
          status: res.status,
          chapterTitle: res.data['chapter_title'],
          chapterUrl: res.data['chapter_url']
        }
      })
      .catch((e) => { 
        console.log(e)
      })
    return res
  }

  // private async send(
  //   uri: string,
  //   payload: unknown
  // ): Promise<AxiosResponse | void> {
  //   const res = await this.client.post(uri, payload);
  //   console.log(res.data);
  //   console.log(res.status);
  //   return res;
  // }
}
