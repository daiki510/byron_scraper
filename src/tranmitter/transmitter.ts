import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ScrapedData } from '../../types';
import ApiURIs from './ApiURIs';

export default class Transmitter {
  client: AxiosInstance;
  //TODO:ログ出力
  //TODO:API認証
  //TODO:レスポンスに対しても型定義する検討
  constructor() {
    this.client = axios.create({
      baseURL: 'http://127.0.0.1:10080/api',
      timeout: 180000,
      // headers: {
      //   Authorization: 'Bearer ' + 'YOUR_API_KEY',
      // }
    })
  }

  async sendScrapedData(payload: ScrapedData): Promise<AxiosResponse | void> {
    return await this.send(ApiURIs.COMIC, payload)
      .catch(function (error) {
          console.log(error)
        })
      .then(function () {
          console.log ("*** 終了 ***")
        })
  }

  private async send(
    uri: string,
    payload: unknown
  ): Promise<AxiosResponse | void> {
    return await this.client.post(uri, payload);
  }
}
