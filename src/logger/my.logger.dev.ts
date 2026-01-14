import { ConsoleLogger } from '@nestjs/common';

export class MyLoggerDev extends ConsoleLogger {
  log(message: string, context?: string) {
    console.log(`**INFO** [${context}] | `, message);
  }
  error(message: string, context?: string) {
    console.log(`**ERROR** [${context}] | `, message);
  }
  warn(message: string, context?: string) {
    console.log(`**WARN** [${context}] | `, message);
  }
  debug(message: string, context?: string) {
    console.log(`**DEBUG** [${context}] | `, message);
  }
  verbose(message: string, context?: string) {
    console.log(`**VERBOSE** [${context}] | `, message);
  }
  fatal(message: string, context?: string) {
    console.log(`**FATAL** [${context}] | `, message);
  }
}
