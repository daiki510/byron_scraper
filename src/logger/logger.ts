import Log4js, { Logger as Logger4js } from 'log4js';
import config from './log.config';
import { ErrMsg } from '../../types.d'

export default class Logger {
  logger: Logger4js;
  private constructor() {
    Log4js.configure(config);
    this.logger = Log4js.getLogger();
  }

  static build = (): Logger  => new Logger();

  debug = (message: string, detail?: unknown): void =>
    this.logger.debug(message, detail);

  info = (message: string): void =>
    this.logger.info(message);

  error = (err: ErrMsg): void =>
    this.logger.error(err.msg, err.detail)
}