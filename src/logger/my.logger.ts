import { LoggerService } from "@nestjs/common";

export class MyLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log('**log', message, context);
  }
  error(message: string, context?: string) {
    console.log('**error', message, context);
  }
  warn(message: string, context?: string) {
    console.log('**warn', message, context);
  }
  debug(message: string, context?: string) {
    console.log('**debug', message, context);
  }
  verbose(message: string, context?: string) {
    console.log('**verbose', message, context);
  }
  fatal(message: string, context?: string) {
    console.log('**fatal', message, context);
  }
}