import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';
import { load } from 'ts-dotenv';
import { NotifyData } from '../../types';

const env = load({
  LINE_TOKEN: String,
});

export default class LineNotify {
  client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: 'https://notify-api.line.me',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${env.LINE_TOKEN}`
      },
    })
  }

  //TODO:ログ出力
  notify(notifyData: NotifyData[]): AxiosResponse | void {
    const url = '/api/notify';
    const data = qs.stringify({
        message: this.generateMessage(notifyData),
    })
    const res = this.client.post(url, data)
      .then((res) => {
        console.log(res.status);
      })
      .catch((e) => { 
        console.log(e)
      })
  }

  generateMessage(notifyData: NotifyData[]): string {
    if (notifyData.length === 0) return 'No Chapters';
  
    const message = notifyData.reduce((prev, current, index, array) => {
      const chapter = `Title：${current.chapterTitle}\URL：${current.chapterUrl}\n`
      return prev + '\n' + chapter
    }, 'New Chapters')
    return message;
  }
}
