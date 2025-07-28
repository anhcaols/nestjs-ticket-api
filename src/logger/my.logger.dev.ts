import { ConsoleLogger } from "@nestjs/common";

export class MyLoggerDev extends ConsoleLogger {
  log(message: string, context?: string) {
    console.log('**log', message, context);
  }
  error(message: string, context?: string) {
    console.log('**error', message, context);
  }
  warn(message: string, context?: string) {
    console.log('**warn', message, context);
  }
}