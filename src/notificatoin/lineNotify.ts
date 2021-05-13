import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'querystring';
import { load } from 'ts-dotenv';
import { NotifyData } from '../../types';
import { Logger, LogMessages } from '../logger';

const env = load({
  LINE_TOKEN: String,
});

export default class LineNotify {
  private client: AxiosInstance;
  private logger: Logger;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://notify-api.line.me',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${env.LINE_TOKEN}`
      },
    }),
    this.logger = Logger.build();
  }

  async notify(notifyData: NotifyData[]): Promise<void> {
    const url = '/api/notify';
    const data = qs.stringify({
        message: this.generateMessage(notifyData),
    })
    await this.client.post(url, data)
      .then((res) => {
        this.logger.info(LogMessages.Info.成功('LINE通知', res.status))
      })
      .catch((e) => { 
        this.logger.error({
          msg: LogMessages.Error.失敗('LINE通知'),
          detail: e,
        })
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
