import { LoggerService } from '@nestjs/common';
import { createLogger, Logger, format, transports } from 'winston';
import * as dayjs from 'dayjs';
import chalk from 'chalk';

export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'debug',
      format: format
        .combine
        // format.colorize(),
        // format.timestamp(),
        // format.simple()
        (),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const strApp = chalk.green('[Nest]');
              const strContext = chalk.yellow(`[${context}]`);
              return `${strApp} - ${time} ${level}  ${strContext} ${message}`;
            }),
          ),
        }),
        new transports.File({
          dirname: 'log',
          filename: 'demo.dev.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    });
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    this.logger.log('info', message, { context, time });
  }
  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    this.logger.log('error', message, { context, time });
  }
  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    this.logger.log('warn', message, { context, time });
  }
  debug(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    this.logger.log('debug', message, { context, time });
  }
  verbose(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    this.logger.log('verbose', message, { context, time });
  }
  fatal(message: string, context: string) {
    const time = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    this.logger.log('fatal', message, { context, time });
  }
}
